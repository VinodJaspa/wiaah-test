export default function ShippingItem({ label, description, onClick }: {
    label: string;
    description: string;
    onClick?: () => void;
  }) {
    return (
      <div className="flex items-center justify-between py-3 border-b cursor-pointer hover:bg-gray-50 px-2" onClick={onClick}>
        <div>
          <p className="text-sm font-medium text-gray-900">{label}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <div className="text-xl text-gray-400">&gt;</div>
      </div>
    );
  }
  