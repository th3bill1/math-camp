import { useEffect, useState } from "react";
import type { TimetableDay } from "../types";

// visual scale
const DAY_START_MIN = 8 * 60;   // 08:00
const DAY_END_MIN   = 22 * 60;  // 22:00
const PX_PER_MIN    = 3;        // 1 minute = 1px

const typeClasses: Record<string, string> = {
  contest:  "bg-blue-100 text-blue-900 border-blue-300",
  lecture:  "bg-purple-100 text-purple-900 border-purple-300",
  workshop: "bg-amber-100 text-amber-900 border-amber-300",
  meal:     "bg-green-100 text-green-900 border-green-300",
  free_time:"bg-gray-100 text-gray-800 border-gray-300",
  match:    "bg-pink-100 text-pink-900 border-pink-300",
  other:    "bg-slate-100 text-slate-900 border-slate-300",
};

function toMin(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + (m || 0);
}

function hourMarks(fromMin = DAY_START_MIN, toMin = DAY_END_MIN) {
  const fromH = Math.ceil(fromMin / 60);
  const toH = Math.floor(toMin / 60);
  return Array.from({ length: toH - fromH + 1 }, (_, i) => fromH + i);
}

export default function Timetable() {
  const [days, setDays] = useState<TimetableDay[]>([]);
  useEffect(() => {
    fetch("/data/timetable.json").then(r => r.json()).then(d => setDays(d.days));
  }, []);

  return (
    <div className="flex gap-8 overflow-x-auto pb-4">
      {days.map((day) => {
        const totalHeight = (DAY_END_MIN - DAY_START_MIN) * PX_PER_MIN;

        const blocks = day.slots.map((s, i) => {
          const startMin = s.start ? toMin(s.start) : DAY_START_MIN;
          const dur = s.duration || (s.end ? toMin(s.end) - startMin : 0);
          const top = (startMin - DAY_START_MIN) * PX_PER_MIN;
          const height = dur * PX_PER_MIN;
          return { key: day.label + i, s, top, height };
        });

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
                className="relative rounded-lg border bg-white overflow-hidden"
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
                {blocks.map(({ key, s, top, height }) => (
                  <div
                    key={key}
                    className={`absolute left-2 right-2 rounded-md border px-3 py-2 shadow-sm ${typeClasses[s.type] || typeClasses.other}`}
                    style={{ top, height }}
                  >
                    <div className="text-[11px] opacity-70">
                      {s.start}{s.end ? `–${s.end}` : ` · ${s.duration} min`}
                    </div>
                    <div className="font-medium leading-snug">{s.title}</div>
                    {s.groups?.length ? (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {s.groups.map(g => (
                          <span key={g} className="text-[10px] px-1.5 py-0.5 rounded bg-white/60 border">
                            {g}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    {s.location ? (
                      <div className="mt-1 text-[11px] opacity-70">{s.location}</div>
                    ) : null}
                    {s.notes ? (
                      <div className="mt-1 text-[11px] italic opacity-70">{s.notes}</div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
