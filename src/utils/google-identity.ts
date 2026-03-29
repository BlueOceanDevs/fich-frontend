const GOOGLE_IDENTITY_SCRIPT_ID = "google-identity-services";
const GOOGLE_IDENTITY_SCRIPT_SRC = "https://accounts.google.com/gsi/client";

let googleIdentityScriptPromise: Promise<void> | null = null;

function hasGoogleIdentity() {
  return typeof window !== "undefined" && !!window.google?.accounts?.id;
}

export function getGoogleClientId() {
  return process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim() ?? "";
}

export function isGoogleAuthConfigured() {
  return getGoogleClientId().length > 0;
}

export function loadGoogleIdentityScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(
      new Error("Google Sign-In can only load in the browser.")
    );
  }

  if (hasGoogleIdentity()) {
    return Promise.resolve();
  }

  if (googleIdentityScriptPromise) {
    return googleIdentityScriptPromise;
  }

  googleIdentityScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById(
      GOOGLE_IDENTITY_SCRIPT_ID
    ) as HTMLScriptElement | null;

    const handleLoad = (event?: Event) => {
      const script =
        (event?.currentTarget as HTMLScriptElement | null) ?? existingScript;

      if (script) {
        script.dataset.loaded = "true";
      }

      if (hasGoogleIdentity()) {
        resolve();
        return;
      }

      googleIdentityScriptPromise = null;
      reject(new Error("Google Sign-In loaded, but the SDK was unavailable."));
    };

    const handleError = () => {
      googleIdentityScriptPromise = null;
      reject(new Error("Failed to load Google Sign-In."));
    };

    if (existingScript) {
      if (existingScript.dataset.loaded === "true") {
        handleLoad();
        return;
      }

      existingScript.addEventListener("load", handleLoad, { once: true });
      existingScript.addEventListener("error", handleError, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = GOOGLE_IDENTITY_SCRIPT_ID;
    script.src = GOOGLE_IDENTITY_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener("error", handleError, { once: true });
    document.head.appendChild(script);
  });

  return googleIdentityScriptPromise;
}

export function disableGoogleAutoSelect() {
  if (typeof window === "undefined") {
    return;
  }

  window.google?.accounts?.id?.disableAutoSelect();
}
