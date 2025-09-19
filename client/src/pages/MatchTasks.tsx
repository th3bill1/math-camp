import { Link } from "react-router-dom";

export function PdfViewer({ file }: { file: string }) {
  return (
    <div className="w-full h-[85vh]">
      <iframe
        src={`${file}#view=FitH`}
        className="w-full h-full border rounded-lg"
        title="Tasks PDF"
      />
    </div>
  );
}

export function Mlodsza() {
  return <PdfViewer file="/data/mmm.pdf" />;
}

export function Starsza() {
  return <PdfViewer file="/data/mms.pdf" />;
}

export function Elita() {
  return <PdfViewer file="/data/mme.pdf" />;
}

export default function MatchTasks() {
  const groups = [
    { name: "Młodsza", path: "/mecz/mlodsza", color: "bg-blue-100 text-blue-800 hover:bg-blue-200" },
    { name: "Starsza", path: "/mecz/starsza", color: "bg-green-100 text-green-800 hover:bg-green-200" },
    { name: "Elita", path: "/mecz/elita", color: "bg-purple-100 text-purple-800 hover:bg-purple-200" },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">
        Zobacz zadania Meczu Matematycznego
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
