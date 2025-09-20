export default function CancellationPolicy({ policy }) {
    return (
      <section className="text-sm text-gray-600">
        <h2 className="font-semibold text-lg mb-2">Cancellation Policy</h2>
        <p>{policy}</p>
      </section>
    );
  }
  