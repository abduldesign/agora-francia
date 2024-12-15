<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;

class ItemController extends Controller
{
     // Constructor for middleware
     public function __construct()
     {
         // This ensures that all methods require authentication, except 'index'
         $this->middleware('auth')->except('index');
     }

    // Add a new item (Seller/Admin)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'sale_type' => 'required|in:immediate,negotiation,auction',
            'photos' => 'required|array',
            'photos.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'auction_start' => 'required_if:sale_type,auction|date|after:now',
            'auction_end' => 'required_if:sale_type,auction|date|after:auction_start',
        ]);

        // Handle photo uploads
        $photoPaths = [];
        if($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('photos', 'public');
                $photoPaths[] = Storage::url($path);
            }
        }

        // Create item
        $item = Item::create([
            'seller_id' => $request->user()->id,
            'category_id' => $validated['category_id'],
            'name' => $validated['name'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'sale_type' => $validated['sale_type'],
            'photos' => $photoPaths,
            'auction_start' => $validated['sale_type'] === 'auction' ? $validated['auction_start'] : null,
            'auction_end' => $validated['sale_type'] === 'auction' ? $validated['auction_end'] : null,
        ]);

        return response()->json(['message' => 'Item added successfully', 'item' => $item], 201);
    }

    // Update an existing item (Seller/Admin)
    public function update(Request $request, Item $item)
    {
        // Only the seller or admin can update the item
        if ($request->user()->role != 'admin' && $item->seller_id != $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'price' => 'sometimes|numeric|min:0',
            'category_id' => 'sometimes|exists:categories,id',
            'sale_type' => 'sometimes|in:immediate,negotiation,auction',
            'photos' => 'sometimes|array',
            'photos.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'auction_start' => 'sometimes|required_if:sale_type,auction|date|after:now',
            'auction_end' => 'sometimes|required_if:sale_type,auction|date|after:auction_start',
        ]);

        // Update item details
        $item->update($validated);

        // Handle photo uploads
        if($request->hasFile('photos')) {
            // Delete old photos if necessary
            if($item->photos) {
                foreach ($item->photos as $oldPhoto) {
                    $oldPath = str_replace('/storage/', '', $oldPhoto);
                    Storage::disk('public')->delete($oldPath);
                }
            }

            $photoPaths = [];
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('photos', 'public');
                $photoPaths[] = Storage::url($path);
            }
            $item->photos = $photoPaths;
            $item->save();
        }

        return response()->json(['message' => 'Item updated successfully', 'item' => $item]);
    }

    // Delete an item (Seller/Admin)
    public function destroy(Request $request, Item $item)
    {
        // Only the seller or admin can delete the item
        if ($request->user()->role != 'admin' && $item->seller_id != $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Delete associated photos
        if($item->photos) {
            foreach ($item->photos as $photo) {
                $path = str_replace('/storage/', '', $photo);
                Storage::disk('public')->delete($path);
            }
        }

        $item->delete();

        return response()->json(['message' => 'Item deleted successfully']);
    }

    // List all items with filters
public function index(Request $request)
{
    $query = Item::with(['category', 'seller'])->where('status', 'available');
    

    // Filter by sale type
    if($request->has('sale_type')) {
        $query->where('sale_type', $request->input('sale_type'));
    }

    // Filter by category
    if($request->has('category_id')) {
        $query->where('category_id', $request->input('category_id'));
    }

    // Sort by type (rare, high-end, regular) - Assuming based on category
    if($request->has('type')) {
        $query->whereHas('category', function($q) use ($request) {
            $q->where('name', $request->input('type'));
        });
    }

    // Pagination
    $items = $query->paginate(10);

    return response()->json($items);
}


    // Show a single item
    public function show(Item $item)
    {
        $item->load(['category', 'seller']);

        return response()->json($item);
    }
}

