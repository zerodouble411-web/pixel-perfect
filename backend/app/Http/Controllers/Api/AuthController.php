<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (! Auth::attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => ['These credentials do not match our records.'],
            ]);
        }

        $user = $request->user() ?? Auth::user();
        $abilities = $user->is_admin ? ['admin'] : ['viewer'];

        return response()->json([
            'data' => [
                'token' => $user->createToken('portfolio-cms', $abilities)->plainTextToken,
                'user' => ['id' => $user->id, 'name' => $user->name, 'email' => $user->email],
            ],
        ]);
    }

    public function me(Request $request)
    {
        return response()->json(['data' => $request->user()]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['data' => ['status' => 'logged_out']]);
    }
}
