import SectionTitle from '@UI/components/shadcn-components/Title/SectionTitle';
import Subtitle from '@UI/components/shadcn-components/Title/Subtitle';
import {
  MapPin, Users, Image, Camera, Mic, Bell, Calendar
} from 'lucide-react';
import { usePermissions } from '../hooks/usePermissions';
import BackButton from '@UI/components/shadcn-components/Buttons/backtoListButton';
// ✅ use your custom hook

const permissions = [
  { icon: <MapPin className="w-5 h-5 text-gray-600" />, title: "Location", description: "Access your precise location for location-based features." },
  { icon: <Users className="w-5 h-5 text-gray-600" />, title: "Contacts", description: "Access your contacts to find friends and connect with." },
  { icon: <Image className="w-5 h-5 text-gray-600" />, title: "Photos", description: "Access your photos and videos to share content and." },
  { icon: <Camera className="w-5 h-5 text-gray-600" />, title: "Camera", description: "Access your camera to capture photos and videos." },
  { icon: <Mic className="w-5 h-5 text-gray-600" />, title: "Microphone", description: "Access your microphone to record audio for voice." },
  { icon: <Bell className="w-5 h-5 text-gray-600" />, title: "Notifications", description: "Receive notifications to stay updated on new messages." },
  { icon: <Calendar className="w-5 h-5 text-gray-600" />, title: "Calendar", description: "Access your calendar to integrate events and." },
];

export default function AppPermissions({setAppPermissions}) {
  const { requestPermission } = usePermissions();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <SectionTitle title="App Permissions" />

      <div className="flex items-center justify-between mt-4 mb-4">
        <Subtitle>Device Permissions</Subtitle>
        <BackButton label="Back to Account" onClick={()=>setAppPermissions(false)} />
      </div>


      <div className="space-y-4">
        {permissions.map((perm) => (
          <div key={perm.title} className="flex items-center justify-between bg-white px-4 py-3 rounded-lg border">
            <div className="flex items-start space-x-4">
              <div className="p-2 rounded-md bg-gray-100">{perm.icon}</div>
              <div>
                <div className="font-semibold text-sm">{perm.title}</div>
                <div className="text-sm text-gray-500">{perm.description}</div>
              </div>
            </div>
            <button
              className="bg-gray-100 text-sm font-medium text-gray-800 px-4 py-1.5 rounded-md hover:bg-gray-200"
              onClick={() => requestPermission(perm.title as any)} // 👈 convert title to type
            >
              Manage
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
