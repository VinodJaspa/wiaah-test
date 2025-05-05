type CookieOptions = {
  maxAge?: number;
  expires?: Date;
  httpOnly?: boolean;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: boolean | "lax" | "strict" | "none";
};

type ParsedCookie = {
  cookieName: string;
  cookieValue: string;
  options?: CookieOptions;
};

function hasExpiresField(cookie: string): boolean {
  return cookie
    .toLowerCase()
    .split(";")
    .some((part) => part.trim().startsWith("expires="));
}

export function parseCookies(rawCookies: string): ParsedCookie[] {
  if (!rawCookies || !rawCookies.includes("=")) {
    throw new Error("Invalid raw cookies format.");
  }

  const cookieParts = rawCookies.split(",");
  const mergedCookies: string[] = [];

  for (let i = 0; i < cookieParts.length; i++) {
    const part = cookieParts[i];
    if (hasExpiresField(part)) {
      mergedCookies.push(`${part},${cookieParts[++i] ?? ""}`);
    } else if (i === 0 || !hasExpiresField(cookieParts[i - 1])) {
      mergedCookies.push(part);
    }
  }

  return mergedCookies.map((rawCookie) => {
    const [nameValue, ...attributes] = rawCookie.split(";");
    const [rawName, ...valueParts] = nameValue.split("=");
    const rawValue = valueParts.join("=").trim();

    const cookieName = rawName.trim();
    const cookieValue = rawValue.startsWith('"') && rawValue.endsWith('"')
      ? rawValue.slice(1, -1)
      : rawValue;

    const options: CookieOptions = {};

    for (const attr of attributes) {
      const [rawKey, rawVal] = attr.split("=");
      const key = rawKey.trim().toLowerCase();
      const val = rawVal?.trim();

      switch (key) {
        case "max-age":
        case "maxage":
          options.maxAge = Number(val);
          break;
        case "expires":
          options.expires = new Date(val ?? "");
          break;
        case "path":
          options.path = val;
          break;
        case "domain":
          options.domain = val;
          break;
        case "secure":
          options.secure = true;
          break;
        case "httponly":
          options.httpOnly = true;
          break;
        case "samesite":
          if (val) {
            const v = val.toLowerCase();
            options.sameSite = ["lax", "strict", "none"].includes(v)
              ? (v as "lax" | "strict" | "none")
              : true;
          }
          break;
        default:
          break;
      }
    }

    return {
      cookieName,
      cookieValue,
      options: Object.keys(options).length ? options : undefined,
    };
  });
}
export function parseCookiesToRecord(rawCookies: string): Record<string, string> {
  const parsed = parseCookies(rawCookies); // Reuse your existing parser
  return parsed.reduce((acc, { cookieName, cookieValue }) => {
    acc[cookieName] = cookieValue;
    return acc;
  }, {} as Record<string, string>);
}
