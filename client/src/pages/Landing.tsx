import { useEffect, useState } from "react";
import type { Camp } from "../types";
import Info from "./Info";

export default function Landing() {
  const [camp, setCamp] = useState<Camp | null>(null);
  useEffect(() => { fetch("/data/camp.json").then(r=>r.json()).then(setCamp); }, []);
  if (!camp) return null;
  return (
    <div className="space-y-4">
      <img src={camp.posterUrl} alt="Plakat obozu" className="rounded-lg shadow size-1/3 mx-auto" />
      <Info />
    </div>
  );
}