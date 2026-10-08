export const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "/api";

export const DASHBOARD_URL =
  import.meta.env.VITE_DASHBOARD_URL || "/dashboard";

export const getDashboardRedirectUrl = (token, user) => {
  const base = DASHBOARD_URL;

  if (token && user) {
    return `${base}/?token=${encodeURIComponent(token)}&user=${encodeURIComponent(
      JSON.stringify(user)
    )}`;
  }

  return base;
};


