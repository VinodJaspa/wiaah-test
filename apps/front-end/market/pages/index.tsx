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
    functional: false,
  });

  useEffect(() => {
    const savedPrefs = JsCookie.get("cookie_prefs");
    if (savedPrefs) {
      setPrefs(JSON.parse(savedPrefs));
    }
  }, []);

  const handleChange = (key) => {
    if (key !== "essential") {
      setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
    }
  };

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md animate-fadeIn">
        <h2 className="text-lg font-bold mb-4">Cookie Preferences</h2>
        <div className="space-y-3">
          {[
            { key: "essential", label: "Essential (Always Enabled)", disabled: true },
            { key: "analytics", label: "Analytics" },
            { key: "marketing", label: "Marketing" },
            { key: "functional", label: "Functional" },
          ].map(({ key, label, disabled }) => (
            <label
              key={key}
              className="flex items-center gap-3 text-gray-800 text-sm"
            >
              <input
                type="checkbox"
                checked={prefs[key]}
                disabled={disabled}
                onChange={() => handleChange(key)}
                className={`${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
              />
              {label}
            </label>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(prefs)}
            className="px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
