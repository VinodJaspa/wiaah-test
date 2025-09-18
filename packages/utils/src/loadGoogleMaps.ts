export const loadGoogleMaps = (apiKey: string): Promise<typeof window.google> => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject("Window is undefined");

    // If already loaded
    if (window.google?.maps) return resolve(window.google);

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.google) resolve(window.google);
      else reject("Google Maps not available");
    };
    script.onerror = (err) => reject(err);

    document.head.appendChild(script);
  });
};
