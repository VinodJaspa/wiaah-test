'use client';

import * as Switch from '@radix-ui/react-switch';
import { useState } from 'react';
import {
  Smartphone,
  BarChart2,
  Users,
  CreditCard,
} from 'lucide-react';
import SectionTitle from '@UI/components/shadcn-components/Title/SectionTitle';
import DownloadDataDialog from '../Dialog/DownloadDataDialog';
import { updateDataSharingPreferencesMutation } from '@features/Accounts/services/updateDataSharingPreferences';
import { errorToast, successToast } from 'utils';
import Subtitle from '@UI/components/shadcn-components/Title/Subtitle';
import BackButton from '@UI/components/shadcn-components/Buttons/backtoListButton';

const options = [
  {
    icon: <Smartphone className="w-5 h-5 text-gray-600" />,
    title: 'Settings',
    subtitle: 'Ad Partners',
    description: 'Show personalized ads.',
    key: 'ads',
  },
  {
    icon: <BarChart2 className="w-5 h-5 text-gray-600" />,
    title: 'Your Experience',
    subtitle: 'Analytics Tools',
    description: 'Help us improve your experience.',
    key: 'analytics',
  },
  {
    icon: <Users className="w-5 h-5 text-gray-600" />,
    title: 'Settings',
    subtitle: 'Social Networks',
    description: 'Share data for account syncing.',
    key: 'social',
  },
  {
    icon: <CreditCard className="w-5 h-5 text-gray-600" />,
    title: 'Payment',
    subtitle: 'Payment Processors',
    description: 'Process your payments.',
    key: 'payment',
  },
];

export default function DataSharingPreferences({setDataSharing}) {
  const [isDownloadOpen, setDownloadOpen] = useState(false);
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    ads: false,
    analytics: false,
    social: false,
    payment: false,
  });

  const togglePreference = (key: string) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSavePreferences = async () => {
    try {
      const updated = await updateDataSharingPreferencesMutation({
        shareAdPartners: prefs.ads,
        shareAnalyticsTools: prefs.analytics,
        shareSocialNetworks: prefs.social,
        sharePaymentProcessors: prefs.payment,
      });

      console.log("Updated preferences:", updated);
      successToast("Preferences updated successfully!");
    } catch (err) {
      console.error("Failed to update preferences", err);
      errorToast("Failed to update preferences");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
   
       <div className="flex items-center justify-between mt-4 mb-4">
              <Subtitle>Data Sharing & Third-Party Access</Subtitle>
              <BackButton label="Back to Account" onClick={()=>setDataSharing(false)} />
            </div>
      <DownloadDataDialog isOpen={isDownloadOpen} onClose={() => setDownloadOpen(false)} />

      <p className="text-gray-600">
        We care about your privacy. Below are the third parties we share your data with, and why. You can manage your permissions anytime.
      </p>

      <div className="space-y-6">
        {options.map((item) => (
          <div key={item.key} className="flex items-center justify-between border-b pb-4">
            <div className="flex items-start space-x-4">
              <div className="p-2 rounded-md bg-gray-100">{item.icon}</div>
              <div>
                <h3 className="font-medium text-sm">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.subtitle}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
            <Switch.Root
              className="w-11 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-black outline-none cursor-pointer"
              checked={prefs[item.key]}
              onCheckedChange={() => togglePreference(item.key)}
            >
              <Switch.Thumb className="block w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 translate-x-1 data-[state=checked]:translate-x-6" />
            </Switch.Root>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-8">
        <button className="text-sm text-gray-700 rounded-md px-4 py-2 hover:bg-gray-100">
          Cancel
        </button>
        <div className="flex items-center space-x-3">
          <button
            className="text-sm bg-gray-100 font-medium px-4 py-2 rounded-md hover:bg-gray-200"
            onClick={() => setDownloadOpen(true)}
          >
            Download My Data
          </button>
          <button
            className="bg-black text-white px-4 py-2 rounded-md font-medium hover:bg-gray-900"
            onClick={handleSavePreferences}
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
