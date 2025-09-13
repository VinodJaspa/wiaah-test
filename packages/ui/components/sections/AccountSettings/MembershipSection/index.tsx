import React from "react";
import { useTranslation } from "react-i18next";
import { useGetMembershipsQuery, useGetMyMembershipQuery } from "@features/Membership";
import { Button } from "@UI/components";
import SectionTitle from "@UI/components/shadcn-components/Title/SectionTitle";
import Subtitle from "@UI/components/shadcn-components/Title/Subtitle";
import CancelMembershipDialog from "./Dialog/CancelMembershipDialog";
import CancellationSuccessDialog from "./Dialog/CancellationSuccessDialog";

export const MembershipCard = ({ title, price, description, features, isRecommended }: {
  title: string;
  price: string;
  description?: string;
  features: string[];
  isRecommended?: boolean;
}) => {
  return (
    <div className="border rounded-lg p-6 w-full max-w-sm shadow-sm flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Subtitle>
          {title}
        </Subtitle>

        {isRecommended && (
          <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">Recommended</span>
        )}
      </div>
      <div className="text-3xl font-bold">{price} <span className="text-sm font-normal">/month</span></div>
      <button className="bg-gray-100 text-black rounded-md py-2">Select</button>
      <ul className="text-sm text-gray-700 space-y-1">
        {features.map((f, idx) => (
          <li key={idx} className="flex items-start gap-2">✓ {f}</li>
        ))}
      </ul>
    </div>
  );
};

export const MembershipSection: React.FC = () => {
  const { t } = useTranslation();
  const { data: myMembership } = useGetMyMembershipQuery();
  const [isCancelMemberShipDialog, setCancelMemberShipDialog] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(true);
  return (
    <div className="w-full p-6 flex flex-col gap-8">
      <SectionTitle title={t("Membership")} />
      <CancelMembershipDialog
        isOpen={isCancelMemberShipDialog}
        onClose={() => setCancelMemberShipDialog(false)}
        onCancelMembership={() => {
          // your cancel logic
          setCancelMemberShipDialog(false);
          setShowSuccess(true);
        }}
      />
      <CancellationSuccessDialog
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        onRejoin={() => console.log("Rejoin clicked")}
        onReturnToAccount={() => {
          setShowSuccess(false);
          // Navigate to account page
        }}
      />

      <div>
        <h2 className="text-lg font-semibold mb-2">{t("Current Plan")}</h2>
        <div className="flex items-center gap-4 bg-gray-100 px-4 py-2 w-fit rounded-lg">
          <div className="text-sm font-medium">Premium</div>
          <div className="text-xs text-gray-500">Expires on 12/31/2024</div>
        </div>
      </div>

      <div>
        <Subtitle>
          {t("Available Plans")}
        </Subtitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <MembershipCard
            title="Basic"
            price="Free"
            features={["Limited listings", "Basic analytics"]}
          />

          <MembershipCard
            title="Standard"
            price="$19.99"
            features={["Unlimited listings", "Advanced analytics", "Priority support"]}
            isRecommended
          />

          <MembershipCard
            title="Premium"
            price="$49.99"
            features={["Unlimited listings", "Advanced analytics", "24/7 support", "Exclusive features"]}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end mt-6 gap-2 sm:gap-4">
        <button onClick={() => setCancelMemberShipDialog(true)} className="text-sm text-blue-600 hover:underline w-full sm:w-auto text-center">
          {t("Cancel Membership")}
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg w-full sm:w-auto">
          {t("Upgrade to Premium")}
        </button>

      </div>

    </div>
  );
};
