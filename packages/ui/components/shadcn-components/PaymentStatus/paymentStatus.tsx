export default function PaymentStatus({ payment }) {
    return (
      <section className="space-y-1 text-sm">
        <div>
          <h2 className="font-semibold text-lg">Payment Info</h2>
          <p>Visa **** {payment.cardLast4}</p>
        </div>
        <div>
          <h2 className="font-semibold text-lg">Status</h2>
          <p>{payment.status} — {payment.date}</p>
        </div>
      </section>
    );
  }
  