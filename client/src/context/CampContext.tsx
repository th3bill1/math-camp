import { createContext, useContext, useEffect, useState } from "react";
import type { Camp } from "../types";

const CampContext = createContext<Camp | null>(null);

export function CampProvider({ children }: { children: React.ReactNode }) {
  const [camp, setCamp] = useState<Camp | null>(null);

  useEffect(() => {
    fetch(`/data/camp.json?ts=${Date.now()}`)
      .then((r) => r.json())
      .then(setCamp);
  }, []);

  if (!camp) return null;
  return <CampContext.Provider value={camp}>{children}</CampContext.Provider>;
}

export function useCamp() {
  return useContext(CampContext);
}
