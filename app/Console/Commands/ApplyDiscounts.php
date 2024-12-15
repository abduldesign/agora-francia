<?php

namespace App\Console\Commands;
use Illuminate\Console\Command;
use App\Models\Item;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB; // Import the DB facade

class ApplyDiscounts extends Command
{
    protected $signature = 'discounts:apply';
    protected $description = 'Apply discounts to items during special occasions';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        // Example: Apply 10% discount on Christmas
        $today = Carbon::today();
        if ($today->isChristmas()) {
            Item::where('status', 'available')->update(['price' => DB::raw('price * 0.9')]);
            $this->info('Christmas discounts applied successfully.');
        }

        // Add more conditions for other special days

        return 0;
    }
}
