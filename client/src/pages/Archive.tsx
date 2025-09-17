import { Link } from "react-router-dom";
import { PdfViewer } from "./Tasks";

export function Mlodsza1() {
  return <PdfViewer file="/data/cm.pdf" />;
}

export function Starsza1() {
  return <PdfViewer file="/data/cs.pdf" />;
}

export function Elita1() {
  return <PdfViewer file="/data/ce.pdf" />;
}

export default function TasksArchive() {
  const groups = [
    { name: "Młodsza Dzień 1", path: "/zadania/mlodsza", color: "bg-blue-100 text-blue-800 hover:bg-blue-200" },
    { name: "Starsza Dzień 1", path: "/zadania/starsza", color: "bg-green-100 text-green-800 hover:bg-green-200" },
    { name: "Elita Dzień 1", path: "/zadania/elita", color: "bg-purple-100 text-purple-800 hover:bg-purple-200" },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">
        Zobacz zadania swojej grupy
      </h1>

      <div className="grid gap-6 sm:grid-cols-3">
        {groups.map(g => (
          <Link
            key={g.name}
            to={g.path}
            className={`rounded-2xl shadow-md px-6 py-10 text-center font-semibold text-lg transition ${g.color}`}
          >
            {g.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
