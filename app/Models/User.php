<?php
namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Relationships
    public function items()
    {
        return $this->hasMany(Item::class, 'seller_id');
    }

    public function bids()
    {
        return $this->hasMany(Bid::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class, 'buyer_id');
    }
}
