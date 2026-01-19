const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(
  endpoint,
  options = {}
) {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("kernel_token")
      : null;

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "API Error");
  }

  return res.json();
}
