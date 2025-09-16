import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

type ScoresData = {
  group: string;
  students: {
    name: string;
    scores: Record<string, number[]>;
  }[];
};

function ScoresTable({ url, title }: { url: string; title?: string }) {
  const [data, setData] = useState<ScoresData | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(url).then(r => r.json()).then(d => alive && setData(d)).catch(() => alive && setData(null));
    return () => { alive = false; };
  }, [url]);

  const { days, tasksPerDay } = useMemo(() => {
    if (!data || data.students.length === 0) return { days: [] as string[], tasksPerDay: 0 };
    const first = data.students[0];
    const ds = Object.keys(first.scores)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    const tpd = first.scores[ds[0]]?.length ?? 0;
    return { days: ds, tasksPerDay: tpd };
  }, [data]);

  const totals = useMemo(() => {
    if (!data) return [] as number[];
    return data.students.map(s =>
      Object.values(s.scores).flat().reduce((sum, v) => sum + (v || 0), 0)
    );
  }, [data]);

  const translateDay = (dayKey: string) => {
    const num = dayKey.replace(/\D/g, "");
    return num ? `Dzień ${num}` : dayKey;
  };

  if (!data) return null;

  return (
    <div className="overflow-x-auto space-y-4">
      {title && <h1 className="text-xl font-semibold">{title}</h1>}
      <table className="min-w-full border rounded text-sm">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-2 text-left align-bottom">#</th>
            <th className="p-2 text-left align-bottom">Uczeń</th>
            {days.map(d => (
              <th key={d} className="p-2 text-center font-semibold" colSpan={tasksPerDay}>
                {translateDay(d)}
              </th>
            ))}
            <th className="p-2 text-right align-bottom">Suma</th>
          </tr>
          <tr className="bg-gray-50 border-b">
            <th className="p-2" />
            <th className="p-2" />
            {days.flatMap(d =>
              (data.students[0].scores[d] ?? []).map((_, i) => (
                <th key={`${d}-t${i}`} className="p-2 text-center">Z{i + 1}</th>
              ))
            )}
            <th className="p-2" />
          </tr>
        </thead>
        <tbody>
          {data.students.map((s, idx) => (
            <tr key={s.name} className="border-t hover:bg-gray-50">
              <td className="p-2 text-gray-500">{idx + 1}</td>
              <td className="p-2 font-medium">{s.name}</td>
              {days.flatMap(d =>
                (s.scores[d] ?? Array.from({ length: tasksPerDay }, () => 0)).map((v, i) => (
                  <td key={`${s.name}-${d}-${i}`} className="p-2 text-center">{v ?? 0}</td>
                ))
              )}
              <td className="p-2 text-right font-semibold">{totals[idx]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ScoresMlodsza() {
  return <ScoresTable url="/data/scores-gm.json" title="Grupa Młodsza" />;
}
export function ScoresStarsza() {
  return <ScoresTable url="/data/scores-gs.json" title="Grupa Starsza" />;
}
export function ScoresElita() {
  return <ScoresTable url="/data/scores-ge.json" title="Grupa Elita" />;
}

export default function Scores() {
  const groups = [
    { name: "Młodsza", path: "/wyniki/mlodsza", color: "bg-blue-50 hover:bg-blue-100" },
    { name: "Starsza", path: "/wyniki/starsza", color: "bg-green-50 hover:bg-green-100" },
    { name: "Elita",   path: "/wyniki/elita", color: "bg-purple-50 hover:bg-purple-100" },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 space-y-8">
      <h1 className="text-2xl font-bold text-center">Wyniki – wybierz grupę</h1>
      <div className="grid gap-6 sm:grid-cols-3">
        {groups.map(g => (
          <Link key={g.name} to={g.path}
            className={`rounded-2xl shadow px-5 py-8 text-center transition ${g.color}`}>
            <div className="text-lg font-semibold">{g.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
