const VAULT_KEY = "textspeeder-vault";

export const textVault = {
  save(text) {
    if (!text) return false;
    localStorage.setItem(VAULT_KEY, text);
    return true;
  },
  load() {
    return localStorage.getItem(VAULT_KEY) || "";
  },
  clear() {
    localStorage.removeItem(VAULT_KEY);
  },
  exists() {
    return !!localStorage.getItem(VAULT_KEY);
  },
};

