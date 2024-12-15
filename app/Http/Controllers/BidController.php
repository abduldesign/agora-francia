<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Bid;
use App\Models\Item;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class BidController extends Controller
{
    // Place a bid on an item
    public function placeBid(Request $request, $itemId)
    {
        $validated = $request->validate([
            'bid_amount' => 'required|numeric|min:1',
        ]);

        $item = Item::findOrFail($itemId);

        if ($item->sale_type !== 'auction') {
            return response()->json(['message' => 'Item is not available for auction'], 400);
        }

        $now = Carbon::now();
        if ($item->auction_start && $item->auction_end) {
            if ($now->lt($item->auction_start) || $now->gt($item->auction_end)) {
                return response()->json(['message' => 'Auction is not active'], 400);
            }
        } else {
            return response()->json(['message' => 'Auction timing not set'], 400);
        }

        // Find the current highest bid
        $highestBid = $item->bids()->max('bid_amount') ?? 0;

        if ($validated['bid_amount'] <= $highestBid) {
            return response()->json(['message' => 'Bid must be higher than the current highest bid'], 400);
        }

        // Create the bid
        $bid = Bid::create([
            'item_id' => $item->id,
            'user_id' => $request->user()->id,
            'bid_amount' => $validated['bid_amount'],
        ]);

        // Optionally, notify the seller about the new bid
        // $item->seller->notify(new NewBidNotification($bid));

        return response()->json(['message' => 'Bid placed successfully', 'bid' => $bid], 201);
    }
}
