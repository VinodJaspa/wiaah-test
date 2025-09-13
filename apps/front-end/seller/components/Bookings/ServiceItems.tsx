export default function ServiceItems({ services }) {
    return (
      <section className="space-y-2">
        <h2 className="font-semibold text-lg">Services Booked</h2>
        {services.map((item) => (
          <div key={item.name} className="flex items-center gap-4">
            <img src={item.image} alt={item.name} className="w-16 h-16 rounded" />
            <div>
              <p>{item.name}</p>
              <p className="text-sm text-gray-600">{item.quantity}</p>
            </div>
          </div>
        ))}
      </section>
    );
  }
  