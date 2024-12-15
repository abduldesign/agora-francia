<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use App\Models\Transaction;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class ItemSold extends Notification implements ShouldQueue
{
    use Queueable;

    protected $transaction;

    /**
     * Create a new notification instance.
     *
     * @param \App\Models\Transaction $transaction
     */
    public function __construct(Transaction $transaction)
    {
        $this->transaction = $transaction;
    }

    /**
     * Determine the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    /**
     * Build the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->subject('Your Item Has Been Sold')
                    ->greeting('Hello ' . $notifiable->name . ',')
                    ->line('Congratulations! Your item "' . $this->transaction->item->name . '" has been sold.')
                    ->line('Final Price: €' . number_format($this->transaction->final_price, 2))
                    ->action('View Transaction', url('/transactions/' . $this->transaction->id))
                    ->line('Thank you for using Agora Francia!');
    }

    /**
     * Get the array representation of the notification for database.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'transaction_id' => $this->transaction->id,
            'item_name' => $this->transaction->item->name,
            'final_price' => $this->transaction->final_price,
        ];
    }
}
