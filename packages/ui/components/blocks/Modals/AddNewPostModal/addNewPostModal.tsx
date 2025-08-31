"use client";
import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";



import {
  Trash2, ChevronRight, Globe, Users, MapPin,
  Facebook, MessageCircle, Smartphone, Send,
  Repeat, Scissors, Video, X
} from "lucide-react";
import { LocationSearchInput } from "@blocks/DataInput";

// ---------------------- File uploader ----------------------
const ImageVideoUploader = ({ onChange }: { onChange: (files: File[]) => void }) => (
  <div className="flex flex-col items-center h-40 justify-center w-full border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 p-4 cursor-pointer hover:bg-gray-100">
    <input
      type="file"
      accept="image/*,video/*"
      multiple
      className="hidden"
      id="fileUpload"
      onChange={(e) => e.target.files && onChange(Array.from(e.target.files))}
    />
    <label htmlFor="fileUpload" className="text-gray-500 text-sm cursor-pointer">
      Click to upload image or video
    </label>
  </div>
);

// ---------------------- Toggle Switch ----------------------
export const NewPostSwitch = ({ checked, onChange }: { checked: boolean; onChange: (val: boolean) => void }) => (
  <button
    type="button"
    className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors ${checked ? "bg-black" : "bg-gray-300"}`}
    onClick={() => onChange(!checked)}
  >
    <div
      className={`w-3 h-3 rounded-full bg-white shadow transform transition-transform ${checked ? "translate-x-5" : "translate-x-0"}`}
    />
  </button>
);

// ---------------------- Settings Row ----------------------
interface SettingsRowProps {
  icon: React.ReactNode;
  label: string;
  subLabel?: string;
  onClick?: () => void;
}

function SettingsRow({ icon, label, subLabel, onClick }: SettingsRowProps) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between py-2 px-2 cursor-pointer hover:bg-gray-50 rounded-xl group"
    >
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-xl bg-gray-100 text-gray-700">{icon}</div>
        <div className="flex flex-col text-sm">
          <span className="font-medium text-gray-900">{label}</span>
          {subLabel && <span className="text-gray-500">{subLabel}</span>}
        </div>
      </div>
      <ChevronRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

// ---------------------- Nested Dialog ----------------------
function NestedDialog({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-[200]" onClose={onClose}>
        {/* Stronger Backdrop */}
        <div className="fixed inset-0 bg-black/60" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-2xl p-4 w-full max-w-md shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>
              <button onClick={onClose}>
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            {children}
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}

// ---------------------- Settings List ----------------------
export function SettingsList({ setFieldValue, values }: any) {
  const [visibilityOpen, setVisibilityOpen] = useState(false);
  const [tagPeopleOpen, setTagPeopleOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);

  const visibilityOptions = ["Everyone", "Friends", "Only Me"];

  return (
    <>
      <SettingsRow
        icon={<Globe className="h-5 w-5" />}
        label="Visibility"
        subLabel={values.visibility}
        onClick={() => setVisibilityOpen(true)}
      />
      <SettingsRow
        icon={<Users className="h-5 w-5" />}
        label="Tag People"
        onClick={() => setTagPeopleOpen(true)}
      />
      <SettingsRow
        icon={<MapPin className="h-5 w-5" />}
        label="Location"
        onClick={() => setLocationOpen(true)}
      />

      {/* Visibility Dialog */}
      <NestedDialog open={visibilityOpen} onClose={() => setVisibilityOpen(false)} title="Visibility">
        <div className="flex flex-col space-y-2">
          {visibilityOptions.map((v) => (
            <button
              key={v}
              className={`px-3 py-2 rounded-lg text-sm text-left ${values.visibility === v ? "bg-black text-white" : "bg-gray-100 text-gray-700"
                }`}
              onClick={() => {
                setFieldValue("visibility", v);
                setVisibilityOpen(false);
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </NestedDialog>

      {/* Tag People Dialog */}
      <NestedDialog open={tagPeopleOpen} onClose={() => setTagPeopleOpen(false)} title="Tag People">
        <p className="text-sm text-gray-600">Tagging functionality coming soon.</p>
      </NestedDialog>

      {/* Location Dialog */}
      <NestedDialog open={locationOpen} onClose={() => setLocationOpen(false)} title="Location">
        {/* <LocationSearchInput onLocationSelect={(loc)=> setFieldValue("location" ,loc)}/> */}
        <LocationPicker
  apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}
  value={values.location}
  onChange={(val) => setFieldValue("location", val)}
/>

      </NestedDialog>
    </>
  );
}

// ---------------------- Share Icons ----------------------
export const shareIcons: Record<string, React.ReactNode> = {
  Facebook: <Facebook className="h-4 w-4" />,
  WhatsApp: <Smartphone className="h-4 w-4" />,
  Messenger: <MessageCircle className="h-4 w-4" />,
  "Direct Message": <Send className="h-4 w-4" />,
};

// ---------------------- Toggle Icons ----------------------
export const toggleOptions: Record<
  string,
  { icon: React.ReactNode; label: string }
> = {
  allowComments: {
    icon: <MessageCircle className="h-4 w-4 text-gray-500" />,
    label: "AllowComments",
  },
  allowDuet: {
    icon: <Repeat className="h-4 w-4 text-gray-500" />,
    label: "Allow Duet",
  },
  allowStitch: {
    icon: <Scissors className="h-4 w-4 text-gray-500" />,
    label: "Allow Stitch",
  },
  allowHQ: {
    icon: <Video className="h-4 w-4 text-gray-500" />,
    label: "Allow High Quality Video",
  },
};


// ---------------------- NewPostModal ----------------------
interface NewPostModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
}

const NewPostModal: React.FC<NewPostModalProps> = ({ open, onClose, onSubmit }) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child as={Fragment}>
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        {/* Modal Panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child as={Fragment}>
            <Dialog.Panel className="w-full max-w-2xl transform rounded-2xl bg-white p-6 shadow-xl transition-all flex flex-col">
              <Dialog.Title as="h3" className="text-lg font-semibold mb-4">
                New Post
              </Dialog.Title>

              <Formik
                initialValues={{
                  text: "",
                  media: [] as File[],
                  location: "",
                  mentions: "",
                  visibility: "Everyone",
                  allowComments: false,
                  allowDuet: false,
                  allowStitch: false,
                  allowHQ: false,
                  shareTo: [] as string[],
                  autoShare: [] as string[],
                }}
                validationSchema={Yup.object().shape({
                  text: Yup.string().max(4000, "Max 4000 characters"),
                })}
                onSubmit={(values, { resetForm }) => {
                  onSubmit(values);
                  resetForm();
                  onClose();
                }}
              >
                {({ setFieldValue, values }) => (
                  <Form className="flex flex-col flex-1">
                    <div className="flex-1 overflow-y-auto max-h-[70vh] pr-2 space-y-4">
                      {/* Media */}
                      {values.media.length > 0 ? (
                        <div className="relative w-full">
                          <button
                            type="button"
                            onClick={() => setFieldValue("media", [])}
                            className="absolute top-2 right-2 z-10 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                          {values.media[0].type.startsWith("image") ? (
                            <img
                              src={URL.createObjectURL(values.media[0])}
                              alt="preview"
                              className="w-full aspect-video object-cover rounded-xl"
                            />
                          ) : (
                            <video
                              src={URL.createObjectURL(values.media[0])}
                              controls
                              className="w-full aspect-video object-cover rounded-xl"
                            />
                          )}
                        </div>
                      ) : (
                        <ImageVideoUploader onChange={(files) => setFieldValue("media", files)} />
                      )}

                      {/* Text */}
                      <div>
                        <Field
                          as="textarea"
                          name="text"
                          placeholder="Share your thoughts within 4000 characters"
                          className="w-full border h-24 rounded-xl p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <ErrorMessage name="text" component="p" className="text-red-500 text-xs mt-1" />
                      </div>

                      {/* Chips */}
                      <div className="flex gap-2 flex-wrap text-xs">
                        {["#Hashtags", "@Mention", "🎥 Video", "🎵 Audio"].map((chip) => (
                          <span key={chip} className="px-2 py-1 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200">
                            {chip}
                          </span>
                        ))}
                      </div>

                      {/* Sharing Options */}
                      <div>
                        <p className="font-semibold text-sm mb-1">Sharing Options</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                          {Object.keys(shareIcons).map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              className={`px-2 py-1 rounded-lg border flex items-center justify-center gap-1 text-xs ${values.shareTo.includes(opt) ? "bg-black text-white" : "bg-white text-gray-700"
                                }`}
                              onClick={() =>
                                setFieldValue(
                                  "shareTo",
                                  values.shareTo.includes(opt) ? values.shareTo.filter((s) => s !== opt) : [...values.shareTo, opt]
                                )
                              }
                            >
                              {shareIcons[opt]}
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Post Settings */}
                      <div className="space-y-2">
                        <p className="text-sm mb-1">Post Settings</p>
                        <SettingsList setFieldValue={setFieldValue} values={values} />

                        {/* Toggles */}
                        {Object.entries(toggleOptions).map(([key, { icon, label }]) => (
                          <div
                            key={key}
                            className="flex items-center justify-between py-2 px-2 cursor-pointer hover:bg-gray-50 rounded-xl"
                          >
                            <div className="flex items-center gap-2 text-sm ">
                              <span className="p-2">{icon}</span>
                              <span>{label}</span>
                            </div>
                            <NewPostSwitch
                              checked={values[key as keyof typeof values] as boolean}
                              onChange={(val) => setFieldValue(key, val)}
                            />
                          </div>
                        ))}

                      </div>

                      {/* Auto-Sharing */}
                      <div>
                        <p className="font-semibold text-sm mb-4">Auto-Sharing</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                          {Object.keys(shareIcons).map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              className={`px-2 py-1 rounded-lg border flex items-center justify-center gap-1 ${values.autoShare.includes(opt) ? "bg-black text-white" : "bg-white text-gray-700"
                                }`}
                              onClick={() =>
                                setFieldValue(
                                  "autoShare",
                                  values.autoShare.includes(opt) ? values.autoShare.filter((s) => s !== opt) : [...values.autoShare, opt]
                                )
                              }
                            >
                              {shareIcons[opt]}
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="w-full rounded-xl bg-black py-2 text-white font-semibold hover:bg-gray-800 text-sm"
                      >
                        Publish
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

// export default NewPostModal;
// ---------------------- Location Picker (Using Google Places API) ----------------------

interface Prediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

interface LocationPickerProps {
  apiKey: string; // Pass your Google API key here
  value: string;
  onChange: (val: string) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ apiKey, value, onChange }) => {
  const [query, setQuery] = useState(value);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch Google Autocomplete API
  const fetchPredictions = async (input: string) => {
    if (!input.trim()) {
      setPredictions([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
          input
        )}&types=geocode&key=${apiKey}`
      );
      const data = await res.json();
      setPredictions(data.predictions || []);
    } catch (err) {
      console.error("Error fetching locations:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (place: Prediction) => {
    setQuery(place.structured_formatting.main_text);
    onChange(place.structured_formatting.main_text);
    setPredictions([]); // close list
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search location"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            fetchPredictions(e.target.value);
          }}
          className="w-full border rounded-lg pl-10 pr-8 p-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setPredictions([]);
              onChange("");
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Suggestions */}
      {predictions.length > 0 && (
        <div className="mt-2 border rounded-lg bg-white shadow-md max-h-64 overflow-y-auto">
          {predictions.map((p) => (
            <div
              key={p.place_id}
              className="flex items-start gap-3 p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(p)}
            >
              <MapPin className="h-4 w-4 mt-1 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">{p.structured_formatting.main_text}</p>
                <p className="text-xs text-gray-500">{p.structured_formatting.secondary_text}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {loading && <p className="text-xs text-gray-500 mt-1">Loading...</p>}
    </div>
  );
};


