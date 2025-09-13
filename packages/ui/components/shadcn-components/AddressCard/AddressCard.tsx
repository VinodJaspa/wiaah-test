// components/AddressCard.tsx
import React from "react";
import EditButton from "../Buttons/editButton";


interface AddressCardProps {
  label: string;
  name: string;
  address: string[];
  onEdit: () => void;
}

const AddressCard: React.FC<AddressCardProps> = ({ label, name, address, onEdit }) => {
  return (
    <div className="mb-6">
      <h3 className="font-semibold text-sm text-gray-900 mb-1">{label}</h3>
      <p className="text-sm text-gray-800 leading-snug">
        {name}
        <br />
        {address.map((line, i) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>
      <EditButton onClick={onEdit} className="mt-2" />
    </div>
  );
};

export default AddressCard;
