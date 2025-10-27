const COOKIE_KEY = "zkwallet_profile";
const COOKIE_MAX_AGE_DAYS = 14;

export type BalanceLedger = Record<string, Record<string, number>>;

export type ProfileState = {
  address: string;
  balances: BalanceLedger;
  lastUpdated: number;
};

const parseCookieString = (): Record<string, string> => {
  if (typeof document === "undefined") {
    return {};
  }
  return document.cookie.split(";").reduce<Record<string, string>>((acc, cookie) => {
    const [name, ...rest] = cookie.trim().split("=");
    if (!name) {
      return acc;
    }
    acc[decodeURIComponent(name)] = decodeURIComponent(rest.join("="));
    return acc;
  }, {});
};

export const loadProfile = (): ProfileState | null => {
  if (typeof document === "undefined") {
    return null;
  }
  try {
    const all = parseCookieString();
    const raw = all[COOKIE_KEY];
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as ProfileState;
    return parsed;
  } catch (error) {
    console.warn("Failed to parse stored profile", error);
    return null;
  }
};

export const persistProfile = (profile: ProfileState) => {
  if (typeof document === "undefined") {
    return;
  }
  const expires = new Date();
  expires.setDate(expires.getDate() + COOKIE_MAX_AGE_DAYS);
  document.cookie = `${encodeURIComponent(COOKIE_KEY)}=${encodeURIComponent(
    JSON.stringify(profile)
  )}; expires=${expires.toUTCString()}; path=/; SameSite=Lax;`;
};

export const clearProfile = () => {
  if (typeof document === "undefined") {
    return;
  }
  document.cookie = `${encodeURIComponent(COOKIE_KEY)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
