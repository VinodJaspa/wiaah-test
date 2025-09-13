import { FaBirthdayCake, FaEnvelope, FaPhone, FaGlobe, FaLanguage } from "react-icons/fa";
import AccountSection from "./AccountSection";
import AccountItem from "./AccountItem";
import AccountOverview from "./AccountOverview";
import DataManagementItem from "./DataManagementItem";
import React from "react";
import DateOfBirthDialog from "./Dialog/ DateOfBirthDialog";
import SectionTitle from "../shadcn-components/Title/SectionTitle";
import AddEmailDialog from "./Dialog/AddEmailDialog";
import AddPhoneDialog from "./Dialog/AddPhoneDialog";
import SelectLanguageDialog from "./Dialog/ SelectLanguageDialog";
import ChooseCountryDialog from "./Dialog/ChooseCountryDialog";
import AppPermissions from "./AppPermissions/AppPermissions";
import DataSharingPreferences from "./DataSharing/DataSharingPreferences";
import AccountManagementDialog from "./Dialog/AccountManagementDialog";
import { useGetAccountSettingsQuery } from "@features/Settings";
import { getUserIdFromCookie } from "./ getUserFromCookie";
import { getMyAccountQueryFetcher } from "@features/Accounts";
import { AccountDeletionSection } from "@sections/AccountSettings";

export default function AccountSectionMainPage() {
  const [isDateOfBirthDialogOpen, setDateOfBirthDialogOpen] = React.useState(false);
  const [isEmailDialogopen, setEmailDialogopen] = React.useState(false);
  const [isPhoneDialog, setPhoneDialog] = React.useState(false)
  const [isSelectLanguageDialog, setSelectLanguageDialog] = React.useState(false);
  const [isCountryDailogOpen, setCountryDailogOpen] = React.useState(false);
  const [isAppPermissions, setAppPermissions] = React.useState(false);
  const [isDataSharing, setDataSharing] = React.useState(false);
  const [isAccountMangeMentDialog, setAccountMangeMentDialog] = React.useState(false);
  type AccountInfo = {
    id: string;
    firstName: string;
    country?: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    phoneVerified: boolean;
    idVerified: boolean;
    verified: boolean;
    online: boolean;
    status: string;
    accountType: string;
    gender: string;
    sales: number;
    birthDate: string;
    photo?: string;
    phone?: string;
    lang?: string;
    currency: string;
    createdAt: string;
    updatedAt: string;
    lastActiveAt?: string;
  };

  const [account, setAccount] = React.useState<AccountInfo | null>(null);

  React.useEffect(() => {
    getMyAccountQueryFetcher().then((response) => {

      setAccount(response);
    }).catch((error) => {

    });
  }, [isEmailDialogopen, isPhoneDialog, isSelectLanguageDialog, isCountryDailogOpen, isDateOfBirthDialogOpen, isAppPermissions, isDataSharing, isAccountMangeMentDialog]);

  if (isAppPermissions) {
    return (
      <AppPermissions setAppPermissions={setAppPermissions} />
    )
  }
  if (isDataSharing) {
    return (
      <DataSharingPreferences setDataSharing={setDataSharing} />
    )
  }
  return (

    <div className="max-w-3xl mx-auto p-6">
      <SectionTitle title="Account"></SectionTitle>
      <DateOfBirthDialog account={account} isOpen={isDateOfBirthDialogOpen} onClose={() => setDateOfBirthDialogOpen(false)} />
      <AddEmailDialog isOpen={isEmailDialogopen} onClose={() => setEmailDialogopen(false)} />
      <AddPhoneDialog account={account} isOpen={isPhoneDialog} onClose={() => setPhoneDialog(false)} />
      <ChooseCountryDialog account={account} isOpen={isCountryDailogOpen} onClose={() => setCountryDailogOpen(false)} />
      <SelectLanguageDialog account={account} isOpen={isSelectLanguageDialog} onClose={() => setSelectLanguageDialog(false)} />
      <AccountManagementDialog accountId={account?.id} isOpen={isAccountMangeMentDialog} onClose={() => setAccountMangeMentDialog(false)} />
      <AccountSection title="Account Information">
        <AccountItem
          icon={<FaBirthdayCake />}
          label="Date of Birth"
          value={
            account?.birthDate
              ? new Date(account.birthDate).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
              : "Not set"
          }
          onEdit={() => setDateOfBirthDialogOpen(true)}
        />

        <AccountItem
          icon={<FaEnvelope />}
          label="Email"
          value={account?.email || "Not set"}
        // onEdit={() => setEmailDialogopen(true)}
        />

        <AccountItem
          icon={<FaPhone />}
          label="Phone Number"
          value={account?.phone || "Not set"}
          onEdit={() => setPhoneDialog(true)}
        />

        <AccountItem
          icon={<FaGlobe />}
          label="Country"
          value={account?.country}
          onEdit={() => setCountryDailogOpen(true)}
        />

        <AccountItem
          icon={<FaLanguage />}
          label="Language"
          value={account?.lang === "en" ? "English" : account?.lang}
          onEdit={() => setSelectLanguageDialog(true)}
        />
      </AccountSection>


      <AccountSection title="Account Overview">
        <AccountOverview />
      </AccountSection>

      <AccountSection title="App Permissions">
        <DataManagementItem label="Manage App Permissions" description="Manage which apps can access your account" actionLabel="Manage" onAction={() => setAppPermissions(true)} />
      </AccountSection>

      <AccountSection title="Third-Party Access">
        <DataManagementItem label="Manage Third-Party Access" description="Manage which third-party services can access your account" actionLabel="Manage" onAction={() => setDataSharing(true)} />
      </AccountSection>

      <AccountSection title="Data Management">
        <DataManagementItem label="Download Your Data" description="Download a copy of your account data" actionLabel="Download" onAction={() => { }} />
        <DataManagementItem label="Delete or Suspend Account" description="Request to delete or suspend your account" actionLabel="Request" onAction={() => setAccountMangeMentDialog(true)} />
      </AccountSection>
    </div>
  );
}
