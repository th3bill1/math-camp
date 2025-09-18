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
  return <PdfViewer file="/data/cm2.pdf" />;
}

export function Starsza() {
  return <PdfViewer file="/data/cs2.pdf" />;
}

export function Elita() {
  return <PdfViewer file="/data/ce2.pdf" />;
}

export default function Tasks() {
  const groups = [
    { name: "Młodsza", path: "/zadania/mlodsza", color: "bg-blue-100 text-blue-800 hover:bg-blue-200" },
    { name: "Starsza", path: "/zadania/starsza", color: "bg-green-100 text-green-800 hover:bg-green-200" },
    { name: "Elita", path: "/zadania/elita", color: "bg-purple-100 text-purple-800 hover:bg-purple-200" },
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
      <div className="text-sm text-gray-600 mt-4 max-w-md text-center">
        Jeśli chcesz zobaczyć zadania z poprzednich dni, przejdź do{" "}
        <Link to="/archiwum" className="text-blue-600 hover:underline">
          archiwum
        </Link>.
      </div>
    </div>
  );
}
