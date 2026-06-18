import { useSyncExternalStore } from "react";
import i18n from "../i18n";

function subscribe(onStoreChange) {
  const handler = () => onStoreChange();

  i18n.on("languageChanged", handler);
  i18n.on("loaded", handler);

  return () => {
    i18n.off("languageChanged", handler);
    i18n.off("loaded", handler);
  };
}

function getSnapshot() {
  return i18n.language;
}

export function useTranslation() {
  useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  return {
    i18n,
    t: (key, options) => i18n.t(key, options),
  };
}
