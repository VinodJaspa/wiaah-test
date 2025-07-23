import React from 'react';

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {}

export const Table: React.FC<TableProps> = ({ children, ...props }) => (
  <table className="min-w-full divide-y divide-gray-200" {...props}>
    {children}
  </table>
);
