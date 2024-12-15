<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AdminController extends Controller
{
    // Add a new seller
    public function addSeller(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $seller = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'role' => 'seller',
        ]);

        return response()->json(['message' => 'Seller added successfully', 'seller' => $seller], 201);
    }

    // Remove a seller
    public function removeSeller(User $seller)
    {
        if ($seller->role !== 'seller') {
            return response()->json(['message' => 'User is not a seller'], 400);
        }

        $seller->delete();

        return response()->json(['message' => 'Seller removed successfully']);
    }
}
