import { useEffect, useState } from "react";
import type { TimetableDay } from "../types";

// visual scale
const DAY_START_MIN = 8 * 60;   // 08:00
const DAY_END_MIN   = 22 * 60;  // 22:00
const PX_PER_MIN    = 3;        // 1 minute = 1px
const GAP_PX        = 4;        // horizontal gap between overlapping columns

const typeClasses: Record<string, string> = {
  contest:  "bg-blue-100 text-blue-900 border-blue-300",
  lecture:  "bg-purple-100 text-purple-900 border-purple-300",
  workshop: "bg-amber-100 text-amber-900 border-amber-300",
  meal:     "bg-green-100 text-green-900 border-green-300",
  free_time:"bg-gray-100 text-gray-800 border-gray-300",
  match:    "bg-pink-100 text-pink-900 border-pink-300",
  other:    "bg-slate-100 text-slate-900 border-slate-300",
};

function toMin(hhmm?: string) {
  if (!hhmm) return DAY_START_MIN;
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + (m || 0);
}

function hourMarks(fromMin = DAY_START_MIN, toMin = DAY_END_MIN) {
  const fromH = Math.ceil(fromMin / 60);
  const toH = Math.floor(toMin / 60);
  return Array.from({ length: toH - fromH + 1 }, (_, i) => fromH + i);
}

// ---- overlap layout ----
type LaidBlock = {
  key: string;
  s: TimetableDay["slots"][number];
  top: number;
  height: number;
  startMin: number;
  endMin: number;
  col: number;   // column index within overlap cluster
  cols: number;  // total columns in this cluster
};

function layoutBlocks(day: TimetableDay): LaidBlock[] {
  // 1) Normalize times
  const items: LaidBlock[] = day.slots.map((s, i) => {
    const startMin = s.start ? toMin(s.start) : DAY_START_MIN;
    const endMin = s.end
      ? toMin(s.end)
      : s.duration
      ? startMin + s.duration
      : startMin;

    const durMin = Math.max(0, endMin - startMin);
    const top = (startMin - DAY_START_MIN) * PX_PER_MIN+2;
    const height = Math.max(1, durMin * PX_PER_MIN)-4;

    return {
      key: day.label + i,
      s,
      startMin,
      endMin,
      top,
      height,
      col: 0,
      cols: 1,
    };
  });

  // 2) Sort by start then longer first
  items.sort((a, b) => a.startMin - b.startMin || b.endMin - a.endMin);

  // 3) Sweep to form clusters of connected overlaps and assign columns within each cluster
  let active: LaidBlock[] = [];
  let cluster: LaidBlock[] = [];

  const finalizeCluster = () => {
    if (cluster.length === 0) return;
    // total columns for cluster is the max concurrent active count encountered during assignment
    const maxCols = Math.max(1, Math.max(...cluster.map(x => x.col)) + 1);
    for (const it of cluster) it.cols = maxCols;
    cluster = [];
  };

  for (const ev of items) {
    // drop finished from active
    active = active.filter(a => a.endMin > ev.startMin);

    // if active emptied, previous cluster ended
    if (active.length === 0 && cluster.length > 0) {
      finalizeCluster();
    }

    // assign smallest free column index among active
    const used = new Set(active.map(a => a.col));
    let c = 0;
    while (used.has(c)) c++;
    ev.col = c;

    active.push(ev);
    cluster.push(ev);
  }
  // last cluster
  finalizeCluster();

  return items;
}

export default function Timetable() {
  const [days, setDays] = useState<TimetableDay[]>([]);
  useEffect(() => {
    fetch("/data/timetable.json")
      .then(r => r.json())
      .then(d => setDays(d.days));
  }, []);

  return (
    <div className="flex gap-8 overflow-x-auto pb-4">
      {days.map((day) => {
        const totalHeight = (DAY_END_MIN - DAY_START_MIN) * PX_PER_MIN;
        const laid = layoutBlocks(day);
        const marks = hourMarks(DAY_START_MIN, DAY_END_MIN);

        return (
          <div key={day.label} className="shrink-0 w-[360px]">
            <h2 className="text-xl font-semibold mb-3 text-center">{day.label}</h2>

            <div className="grid grid-cols-[56px_1fr] gap-3">
              {/* Time gutter */}
              <div className="relative" style={{ height: totalHeight }}>
                {marks.map(h => (
                  <div
                    key={h}
                    className="absolute -translate-y-1/2 text-xs text-gray-500 select-none"
                    style={{ top: ((h * 60 - DAY_START_MIN) * PX_PER_MIN) }}
                  >
                    {String(h).padStart(2, "0")}:00
                  </div>
                ))}
              </div>

              {/* Day column */}
              <div
                className="relative rounded-lg border bg-white overflow-hidden p-2"
                style={{
                  height: totalHeight,
                  backgroundImage:
                    `repeating-linear-gradient(to bottom,
                      transparent 0px,
                      transparent ${60 * PX_PER_MIN - 1}px,
                      rgba(0,0,0,0.05) ${60 * PX_PER_MIN - 1}px,
                      rgba(0,0,0,0.05) ${60 * PX_PER_MIN}px)`,
                }}
              >
                {/* Hour lines */}
                {marks.map(h => (
                  <div
                    key={`line-${h}`}
                    className="absolute left-0 right-0 border-t border-gray-200/60"
                    style={{ top: (h * 60 - DAY_START_MIN) * PX_PER_MIN }}
                  />
                ))}

                {/* Blocks */}
                {laid.map(({ key, s, top, height, col, cols }) => {
                  const totalGap = (cols - 1) * GAP_PX;
                  const baseWidth = `calc((100% - ${totalGap}px) / ${cols} - 4px)`;
                  const left = `calc(((${baseWidth}) + ${GAP_PX}px) * ${col} + 2px)`;

                  const timeText = s.start
                    ? (s.end ? `${s.start}–${s.end}` : s.duration ? `${s.start} · ${s.duration} min` : s.start)
                    : (s.end ? `–${s.end}` : s.duration ? `${s.duration} min` : "");

                  return (
                    <div
                      key={key}
                      className={`absolute rounded-md border px-2.5 py-1.5 shadow-sm overflow-hidden ${typeClasses[s.type] || typeClasses.other}`}
                      style={{ top, height, left, width: baseWidth }}
                      title={s.location || undefined} // tooltip fallback
                    >
                      {/* Time + location inline */}
                      <div className="text-[9px] opacity-70 flex items-center gap-2  min-w-0">
                        <span className="whitespace-nowrap">{timeText}</span>
                        {s.location ? (
                          <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                            • {s.location}
                          </span>
                        ) : null}
                      </div>

                      <div className="font-normal text-sm leading-snug">{s.title}</div>

                      {s.groups?.length ? (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {s.groups.map(g => (
                            <span key={g} className="text-[10px] px-1.5 py-0.5 rounded bg-white/60 border">
                              {g}
                            </span>
                          ))}
                        </div>
                      ) : null}

                      {s.notes ? (
                        <div className="mt-1 text-[11px] italic opacity-70">{s.notes}</div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
