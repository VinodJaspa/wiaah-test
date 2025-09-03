"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface HeaderProps {
  title: string;
  backHref?: string; // optional: where back button goes
}

export default function HeaderTextWithNavigationOnSmallScreen({ title, backHref }: HeaderProps) {
  const router = useRouter();

  return (
    <>
      {/* Mobile header */}
      <div className="sm:hidden flex items-center justify-between px-4 py-3 border-b">
        <button
          onClick={() => (backHref ? router.push(backHref) : router.back())}
          className="p-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-base font-semibold text-center flex-1">{title}</h2>
        <div className="w-7" /> {/* Spacer to balance back button */}
      </div>

      {/* Desktop header */}
      <h2 className="hidden sm:block text-2xl font-semibold mb-6">{title}</h2>
    </>
  );
}
