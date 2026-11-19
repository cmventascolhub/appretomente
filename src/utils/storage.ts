export function getStoredItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const saved = localStorage.getItem(key);
    if (saved === null) return defaultValue;
    if (typeof defaultValue === 'number') {
      const parsed = Number(saved);
      return (Number.isNaN(parsed) ? defaultValue : parsed) as T;
    }
    if (typeof defaultValue === 'string') {
      return saved as T;
    }
    return JSON.parse(saved) as T;
  } catch {
    return defaultValue;
  }
}

export function setStoredItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    if (typeof value === 'string' || typeof value === 'number') {
      localStorage.setItem(key, String(value));
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch {
    // Graceful error handling for storage quota / privacy settings
  }
}
