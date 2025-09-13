// components/Account/AccountSection.tsx
import { ReactNode } from "react";
import Subtitle from "../shadcn-components/Title/Subtitle";


interface AccountSectionProps {
  title: string;
  children: ReactNode;
}

export default function AccountSection({ title, children }: AccountSectionProps) {
  return (
    <div className="mb-6 mt-4">
      <Subtitle >{title}</Subtitle>

      <div className="space-y-2">{children}</div>
    </div>
  );
}
