<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    // User Registration
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'required|in:admin,seller,buyer',
        ]);

        // Only admin can register other admins or sellers
        if(in_array($validated['role'], ['admin', 'seller'])) {
            if(!Auth::check() || Auth::user()->role != 'admin') {
                return response()->json(['message' => 'Only admin can register admin or seller'], 403);
            }
        }

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'role' => $validated['role'],
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully',
            'user' => [
        'name' => $user->name,
        'email' => $user->email,
        'role'=>$user->role,
    ],
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }

    // User Login
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($validated)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = Auth::user();

        $token = $user->createToken('auth_token', ['expires' => now()->addDays(30)])->plainTextToken;

        return response()->json(
            [
                'message' => 'Login successful',
                'user' => [
                    'email' => $user->email,
                    'role'=>$user->role,
                ],
                'access_token' => $token,
                'token_type' => 'Bearer',
            ]
        );
        
    }

    // User Logout
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        
        return response()->json(['message' => 'Logged out successfully']);
    }
}
