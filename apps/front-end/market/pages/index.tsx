import React, { useEffect, useState } from "react";
import type { GetServerSideProps, NextPage } from "next";
import { Container, CookiesInfoBanner } from "ui";
import { HomeView } from "ui/views";
import { MasterLayout } from "@components";
import { getCookie, setCookie } from "cookies-next";
import Head from "next/head";
import JsCookie from "js-cookie";
import { createPortal } from "react-dom";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = getCookie("auth_token", context) || null;
  return { props: { token } };
};

interface MarketPageProps {
  token: string | null;
}

const Market: NextPage<MarketPageProps> = ({ token }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    const consent = JsCookie.get("cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const onAcceptAll = () => {
    setCookie("cookie_consent", "accepted", { maxAge: 365 * 24 * 60 * 60 });
    setCookie(
      "cookie_prefs",
      JSON.stringify({
        essential: true,
        analytics: true,
        marketing: true,
        functional: true,
      }),
      { maxAge: 365 * 24 * 60 * 60 }
    );
    setShowBanner(false);
  };

  const onLetMeChoose = () => {
    setShowPreferences(true);
  };

  const handleSavePreferences = (prefs) => {
    setCookie("cookie_consent", "custom", { maxAge: 365 * 24 * 60 * 60 });
    setCookie("cookie_prefs", JSON.stringify(prefs), {
      maxAge: 365 * 24 * 60 * 60,
    });
    setShowPreferences(false);
    setShowBanner(false);
  };

  return (
    <>
      <Head>
        <title>Wiaah | Market</title>
      </Head>
      <MasterLayout token={token}>
        <Container>
          <HomeView />
        </Container>

        {showBanner && (
          <div className="fixed bottom-4 left-0 w-full">
            <Container>
              <CookiesInfoBanner
                onAcceptAll={onAcceptAll}
                onLetMeChoose={onLetMeChoose}
              />
            </Container>
          </div>
        )}

        {showPreferences && (
          <CookiePreferencesModal
            onSave={handleSavePreferences}
            onClose={() => setShowPreferences(false)}
          />
        )}
      </MasterLayout>
    </>
  );
};

export default Market;

 function CookiePreferencesModal({ onSave, onClose }) {
  const [prefs, setPrefs] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const savedPrefs = JsCookie.get("cookie_prefs");
    if (savedPrefs) {
      setPrefs(JSON.parse(savedPrefs));
    }
  }, []);

  const handleChange = (key: keyof typeof prefs) => {
    if (key !== "essential") {
      setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
    }
  };

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000] overflow-y-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[95%] max-w-2xl animate-fadeIn my-10 space-y-6">
        {/* Title */}
        <h2 className="text-2xl font-bold">Manage Cookie Preferences</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          We use <span className="font-semibold">cookies</span> to enhance your
          experience on our site. These{" "}
          <span className="font-semibold">cookies</span> help us understand how
          you interact with our content, personalize your experience, and
          improve our services. You can choose which types of{" "}
          <span className="font-semibold">cookies</span> you’d like to allow.
        </p>
  
        {/* Cookie Sections */}
        <div className="space-y-6">
          {[
            {
              key: "essential",
              title: "Essential Cookies",
              desc: "These cookies are necessary for the website to function and cannot be switched off. They are set in response to actions like setting privacy preferences, logging in, or filling in forms.",
              disabled: true,
            },
            {
              key: "analytics",
              title: "Analytics Cookies",
              desc: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.",
            },
            {
              key: "marketing",
              title: "Marketing Cookies",
              desc: "These cookies may be set by our advertising partners to show you relevant adverts on other sites.",
            },
          ].map(({ key, title, desc, disabled }) => (
            <div key={key} className="border-b pb-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={prefs[key as keyof typeof prefs]}
                    disabled={disabled}
                    onChange={() => handleChange(key as keyof typeof prefs)}
                    className="sr-only peer"
                  />
                  <div
                    className={`w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-black transition ${
                      disabled ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  ></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
                </label>
              </div>
            </div>
          ))}
        </div>
  
        {/* Buttons */}
        <div className="flex justify-between mt-6 sticky bottom-0 bg-white py-4">
          <button
            onClick={() =>
              onSave({ essential: true, analytics: true, marketing: true })
            }
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
          >
            Accept All
          </button>
          <button
            onClick={() => onSave(prefs)}
            className="px-6 py-2 bg-gray-100 text-gray-800 font-semibold rounded-lg hover:bg-gray-200"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
  
}
