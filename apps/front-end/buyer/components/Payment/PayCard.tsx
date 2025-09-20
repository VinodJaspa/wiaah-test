// components/Card.tsx
import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const PayCard: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm p-4 ${className}`}>
      {children}
    </div>
  );
};

export default PayCard;
