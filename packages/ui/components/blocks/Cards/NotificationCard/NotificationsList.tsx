"use client";

import React from "react";
import {
  Heart,
  UserPlus,
  MessageCircle,
  AtSign,
  Share2,
  Repeat,
  Check,
  Clock,
  ShieldCheck,
  ShieldAlert,
  Package,
  Truck,
  XCircle,
  Loader,
  RotateCcw,
  Ban,
  Store,
  Star,
  Calendar,
  DollarSign,
  Gift,
  Key,
  LifeBuoy,
  FileWarning,
  Eye,
} from "lucide-react";

// ---------- Types ----------
interface Notification {
  id: string;
  type: string;
  message: string;
  time: string;
  user?: { name: string; avatar: string };
  media?: string;
  action?: { label: string; onClick: () => void };
}

interface Section {
  title: string;
  items: Notification[];
}

// ---------- Sample Data ----------
const notificationsBySection: Section[] = [
  {
    title: "Today",
    items: [
      {
        id: "1",
        user: { name: "Sophia Bennett", avatar: "https://picsum.photos/seed/p1/100" },
        type: "like",
        message: "Sophia Bennett and 30 others liked your post",
        time: "1h",
        media: "https://picsum.photos/seed/m1/80",
      },
      {
        id: "3",
        user: { name: "Ethan Carter", avatar: "https://picsum.photos/seed/p2/100" },
        type: "follow",
        message: "Ethan Carter followed you",
        time: "2h",
        action: {
          label: "Confirm",
          onClick: () => alert("Followed back"),
        },
      },
      {
        id: "12",
        type: "system",
        message: "Time to post something new!",
        time: "1h",
      },
      {
        id: "13",
        type: "system",
        message: "Congratulations, your certification has been successfully approved.",
        time: "1h",
      },
      {
        id: "14",
        type: "system",
        message: "We regret to inform you that your certification request has been denied.",
        time: "1h",
      },
    ],
  },
  {
    title: "Yesterday",
    items: [
      {
        id: "15",
        user: { name: "Noah", avatar: "https://picsum.photos/seed/p8/100" },
        type: "like",
        message: "Noah liked your comment: «@Matt See this edit is fire 🔥»",
        time: "1d",
        media: "https://picsum.photos/seed/m9/80",
      },
      {
        id: "19",
        type: "order",
        message: "Your order #790701 is on the way",
        time: "1d",
      },
      {
        id: "28",
        type: "affiliate",
        message: "You received $30 cashback",
        time: "1d",
      },
      {
        id: "30",
        type: "system",
        message: "Your password has been changed",
        time: "1d",
      },
    ],
  },
];

// ---------- Icon Resolver ----------
function getNotificationIcon(item: Notification) {
  if (item.type === "system") {
    if (item.message.includes("approved")) return ShieldCheck;
    if (item.message.includes("denied")) return ShieldAlert;
    if (item.message.includes("password")) return Key;
    if (item.message.includes("support")) return LifeBuoy;
    if (item.message.includes("appeal")) return FileWarning;
    return Clock;
  }

  if (item.type === "order") {
    if (item.message.includes("on the way")) return Truck;
    if (item.message.includes("cancelled")) return XCircle;
    if (item.message.includes("processing")) return Loader;
    if (item.message.includes("returned")) return RotateCcw;
    if (item.message.includes("expired")) return Ban;
    if (item.message.includes("collect")) return Store;
    if (item.message.includes("delivered")) return Package;
    if (item.message.includes("review")) return Star;
    if (item.message.includes("reservation")) return Calendar;
    return Package;
  }

  if (item.type === "affiliate") {
    if (item.message.includes("cashback")) return DollarSign;
    if (item.message.includes("bonus")) return Gift;
    return Gift;
  }

  const map: Record<string, React.ElementType> = {
    like: Heart,
    follow: UserPlus,
    comment: MessageCircle,
    mention: AtSign,
    post: Share2,
    repost: Repeat,
    accepted: Check,
    viewed: Eye,
  };

  return map[item.type] || Clock;
}

// ---------- UI ----------
export default function Notifications() {
  return (
    <div className="p-4 space-y-6 max-w-xl mx-auto">
      {notificationsBySection.map((section) => (
        <div key={section.title}>
          <h2 className="text-lg font-semibold mb-2">{section.title}</h2>
          <div className="space-y-3">
            {section.items.map((item) => {
              const Icon = getNotificationIcon(item);
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl border hover:bg-gray-50 transition"
                >
                  {/* Left: Avatar or Icon */}
                  <div className="flex items-center gap-3 flex-1">
                    {item.user ? (
                      <img
                        src={item.user.avatar}
                        alt={item.user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-gray-600" />
                      </div>
                    )}

                    {/* Message + time */}
                    <div>
                      <p className="text-sm">{item.message}</p>
                      <span className="text-xs text-gray-500">{item.time}</span>
                    </div>
                  </div>

                  {/* Right: Media / Action */}
                  {item.media && (
                    <img
                      src={item.media}
                      alt="media"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  )}
                  {item.action && (
                    <button
                      onClick={item.action.onClick}
                      className="px-3 py-1 text-xs rounded-lg border bg-gray-50 hover:bg-gray-100"
                    >
                      {item.action.label}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
