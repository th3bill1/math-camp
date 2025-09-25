import { Link } from "react-router-dom";
import { PdfViewer } from "./Tasks";

export default function Lectures() {
  const groups = [
    { name: "Wzory Skróconego Mnożenia", path: "/wyklady/wsm", color: "bg-blue-50 hover:bg-blue-100" },
    { name: "Zasada minimum/maksimum",   path: "/wyklady/zmm", color: "bg-green-50 hover:bg-green-100" },
    { name: "Podopieństwo spiralne",     path: "/wyklady/ps",  color: "bg-purple-50 hover:bg-purple-100" },
    { name: "Okręgi wpisane i opisane",  path: "/wyklady/owio", color: "bg-yellow-50 hover:bg-yellow-100" },
    { name: "Równania diofantyczne",     path: "/wyklady/rd",  color: "bg-red-50 hover:bg-red-100" },
    { name: "Warsztaty modulo",          path: "/wyklady/wm",  color: "bg-pink-50 hover:bg-pink-100" },
    { name: "Kolorowanie",               path: "/wyklady/kol",  color: "bg-orange-50 hover:bg-orange-100" },
    { name: "Potęga punktu",             path: "/wyklady/pp",  color: "bg-teal-50 hover:bg-teal-100" },
    { name: "Wielomiany",                path: "/wyklady/wie",  color: "bg-fuchsia-50 hover:bg-fuchsia-100" },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 space-y-8">
      <h1 className="text-2xl font-bold text-center">Wykłady</h1>
      <div className="grid gap-6 sm:grid-cols-3">
        {groups.map((g) => (
          <Link
            key={g.name}
            to={g.path}
            className={`rounded-2xl shadow px-5 py-8 text-center transition ${g.color}`}
          >
            <div className="text-lg font-semibold">{g.name}</div>
          </Link>
        ))}
      </div>
      <h1 className="text-xl font-bold text-gray-800 mt-20">
        Dla osób zainsteresowanych lingiwstyką matematyczną polecamy:
      </h1>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li>
          Książkę &nbsp;
          <a
            href="https://library.oapen.org/bitstream/handle/20.500.12657/93394/external_content.pdf"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            "Linguistics Olympiad. Training guide" Vlad A. Neacșu
          </a>.
        </li>
        <li>
          Materiały &nbsp;
          <a
            href="https://www.youtube.com/playlist?list=PLpwg6OcynHX0Gv5NPyV11qZ37ME7of47p"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            w playliście YouTube
          </a>
          &nbsp; na kanale "PraktycznaTeoria"
        </li>
      </ul>
    </div>
  );
}

// Individual lecture pages
export function WSM() {
  return <PdfViewer file="/data/wsm.pdf" />;
}

export function ZMM() {
  return <PdfViewer file="/data/zmm.pdf" />;
}

export function PS() {
  return <PdfViewer file="/data/ps.pdf" />;
}
export function OWIO() {
    return <PdfViewer file="/data/owio.pdf" />;
}
export function RD() {
    return <PdfViewer file="/data/rd.pdf" />;
}
export function WM() {
    return <PdfViewer file="/data/wm.pdf" />;
}
export function KOL() {
    return <PdfViewer file="/data/kol.pdf" />;
}
export function PP() {
    return <PdfViewer file="/data/pp.pdf" />;
}
export function WIE() {
    return <PdfViewer file="/data/wie.pdf" />;
}
