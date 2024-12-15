<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\Transaction;
use App\Models\Voucher;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\PurchaseConfirmation;
use App\Notifications\ItemSold;

class TransactionController extends Controller
{
    // Purchase an item
    public function purchase(Request $request, $itemId)
    {
        $item = Item::findOrFail($itemId);

        if ($item->status != 'available') {
            return response()->json(['message' => 'Item is not available for purchase'], 400);
        }

        // Check sale type
        if ($item->sale_type == 'auction') {
            // Only allow purchase if user has won the auction
            // Implement logic to check if the current user is the highest bidder and auction has ended
            // For simplicity, this check is omitted
            return response()->json(['message' => 'Cannot purchase auction items directly'], 400);
        }

        // Handle payment information
        $validated = $request->validate([
            'name' => 'required|string',
            'address_line1' => 'required|string',
            'address_line2' => 'nullable|string',
            'city' => 'required|string',
            'postal_code' => 'required|string',
            'country' => 'required|string',
            'phone_number' => 'required|string',
            'payment_card_type' => 'required|in:Visa,MasterCard,American Express,PayPal',
            'card_number' => 'required|string',
            'card_name' => 'required|string',
            'card_expiration_date' => 'required|date_format:m/y',
            'security_code' => 'required|string|min:3|max:4',
            'voucher_code' => 'nullable|string',
        ]);

        // Simulate payment validation (as per spec)
        // In real scenarios, integrate with a payment gateway

        // Handle voucher if provided
        $discount = 0;
        if ($request->filled('voucher_code')) {
            $voucher = Voucher::where('code', $request->input('voucher_code'))->where('is_active', true)->first();
            if ($voucher) {
                $discount = $voucher->discount_amount;
                // Optionally, mark voucher as used
                $voucher->is_active = false;
                $voucher->save();
            } else {
                return response()->json(['message' => 'Invalid voucher code'], 400);
            }
        }

        $finalPrice = $item->price - $discount;
        if ($finalPrice < 0) {
            $finalPrice = 0;
        }

        // Create transaction
        DB::beginTransaction();
        try {
            $transaction = Transaction::create([
                'item_id' => $item->id,
                'buyer_id' => $request->user()->id,
                'final_price' => $finalPrice,
                'payment_status' => 'paid',
            ]);

            // Update item status to sold
            $item->status = 'sold';
            $item->save();

           // Notify seller
$seller = $transaction->item->seller;
$seller->notify(new ItemSold($transaction));

            // Commit transaction
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Purchase failed', 'error' => $e->getMessage()], 500);
        }

        // Send confirmation email to buyer
        Mail::to($transaction->buyer->email)->send(new PurchaseConfirmation($transaction));

        return response()->json(['message' => 'Purchase successful', 'transaction' => $transaction], 201);
    }
}
