<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;


class CategoryController extends Controller
{
  // Retrieve all categories
  public function index()
  {
      $categories = Category::all();
      return response()->json($categories);
  }

   // Add a new category (Admin only)
   public function store(Request $request)
   {
       $this->authorize('admin'); // Ensure only admins can perform this action

       $validated = $request->validate([
           'name' => 'required|string|max:255|unique:categories,name',
       ]);

       $category = Category::create($validated);

       return response()->json(['message' => 'Category created successfully', 'category' => $category], 201);
   }
   // Delete a category (Admin only)
   public function destroy(Request $request, Category $category)
   {
       $this->authorize('admin'); // Ensure only admins can perform this action

       $category->delete();

       return response()->json(['message' => 'Category deleted successfully']);
   }

}
