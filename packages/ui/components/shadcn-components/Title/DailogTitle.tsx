// components/ui/ModalTitle.tsx
import { Dialog } from '@headlessui/react';
import React from 'react';

interface ModalTitleProps {
  children: React.ReactNode;
  className?: string;
}

const ModalTitle: React.FC<ModalTitleProps> = ({ children, className = '' }) => {
  return (
    <Dialog.Title className={`text-sm font-semibold mb-4 text-center ${className}`}>
      {children}
    </Dialog.Title>
  );
};

export default ModalTitle;
