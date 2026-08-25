const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_GAME_API_URL ||
  "";

function normalizePath(path) {
  return path.startsWith("/") ? path : `/${path}`;
}

export function buildApiUrl(path) {
  const normalizedPath = normalizePath(path);

  if (!API_BASE_URL) {
    return normalizedPath;
  }

  return `${API_BASE_URL.replace(/\/+$/, "")}${normalizedPath}`;
}

export { API_BASE_URL };
