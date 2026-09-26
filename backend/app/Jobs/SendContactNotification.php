<?php

namespace App\Jobs;

use App\Models\ContactMessage;
use App\Notifications\ContactMessageReceived;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Notification;

class SendContactNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;

    /** @var array<int, int> */
    public array $backoff = [10, 60, 300];

    public function __construct(public ContactMessage $message)
    {
    }

    public function handle(): void
    {
        Notification::route('mail', config('portfolio.owner_email'))
            ->notify(new ContactMessageReceived($this->message));
    }

    public function failed(\Throwable $exception): void
    {
        logger()->error('Contact notification failed', [
            'message_id' => $this->message->id,
            'error' => $exception->getMessage(),
        ]);
    }
}
