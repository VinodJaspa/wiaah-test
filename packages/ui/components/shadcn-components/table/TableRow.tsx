import React from 'react';

export const TableRow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <tr className="hover:bg-gray-100 transition">{children}</tr>
);
