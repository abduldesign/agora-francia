
<!DOCTYPE html>
<html>
<head>
    <title>Purchase Confirmation</title>
</head>
<body>
    <h1>Thank you for your purchase!</h1>
    <p>Dear {{ $transaction->buyer->name }},</p>
    <p>You have successfully purchased the item: <strong>{{ $transaction->item->name }}</strong></p>
    <p>Final Price: €{{ number_format($transaction->final_price, 2) }}</p>
    <p>Approximate delivery date: {{ now()->addDays(5)->toFormattedDateString() }}</p>
    <p>Thank you for shopping with Agora Francia.</p>
</body>
</html>
