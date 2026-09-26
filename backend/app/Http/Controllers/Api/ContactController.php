<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactMessageRequest;
use App\Jobs\SendContactNotification;
use App\Models\ContactMessage;

class ContactController extends Controller
{
    public function store(StoreContactMessageRequest $request)
    {
        $message = ContactMessage::create($request->validated() + [
            'ip_address' => $request->ip(),
        ]);

        SendContactNotification::dispatch($message)->onQueue('notifications');

        return response()->json([
            'data' => ['status' => 'ok', 'id' => $message->id],
        ], 201);
    }

    public function index()
    {
        return response()->json([
            'data' => ContactMessage::query()->latest()->paginate(25),
        ]);
    }

    public function markRead(ContactMessage $message)
    {
        $message->forceFill(['read_at' => now()])->save();

        return response()->json(['data' => $message]);
    }

    public function destroy(ContactMessage $message)
    {
        $message->delete();

        return response()->noContent();
    }
}
