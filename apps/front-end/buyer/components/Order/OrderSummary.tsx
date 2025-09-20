export default function OrderSummary() {
    return (
      <section>
        <h2 className="font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>$60.00</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>$5.00</span></div>
          <div className="flex justify-between text-red-500"><span>Discount / Promo Code</span><span>–$5.00</span></div>
          <div className="flex justify-between"><span>Fees</span><span>$5.00</span></div>
          <hr />
          <div className="flex justify-between font-semibold"><span>Total</span><span>$65.00</span></div>
        </div>
      </section>
    );
  }
  