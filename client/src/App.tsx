import { BrowserRouter, Routes, Route, NavLink, Link } from "react-router-dom";
import "katex/dist/katex.min.css";
import Landing from "./pages/Landing";
import Timetable from "./pages/Timetable";
import Tasks, {Mlodsza, Starsza, Elita} from "./pages/Tasks";
import Scores, { ScoresStarsza, ScoresMlodsza, ScoresElita } from "./pages/Scores";
import Match from "./pages/Match";
import { useCamp } from "./context/CampContext";

export default function App() {
  const camp = useCamp();
  const link = "px-3 py-2 rounded hover:bg-gray-100";
  const active = ({ isActive }: { isActive: boolean }) =>
    isActive ? link + " bg-gray-200" : link;

  return (
    <BrowserRouter>
      <div className="max-w-5xl mx-auto p-4">
        <nav className="flex items-center justify-center gap-4 mb-6">
          {camp?.logoUrl && (
            <Link to="/" className="shrink-0">
              <img
                src={camp.logoUrl}
                alt="Logo"
                className="h-10 w-auto cursor-pointer"
              />
            </Link>
          )}
          <div className="flex gap-2">
            <NavLink className={active} to="/kalendarz">Kalendarz</NavLink>
            <NavLink className={active} to="/zadania">Zadania</NavLink>
            <NavLink className={active} to="/wyniki">Wyniki</NavLink>
            <NavLink className={active} to="/mecz">Mecz Matematyczny</NavLink>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/kalendarz" element={<Timetable />} />
          <Route path="/zadania" element={<Tasks />} />
          <Route path="/wyniki" element={<Scores />} />
          <Route path="/wyniki/mlodsza" element={<ScoresMlodsza />} />
          <Route path="/wyniki/starsza" element={<ScoresStarsza />} />
          <Route path="/wyniki/elita" element={<ScoresElita />} />
          <Route path="/mecz" element={<Match />} />
          <Route path="/zadania/mlodsza" element={<Mlodsza />} />
          <Route path="/zadania/starsza" element={<Starsza />} />
          <Route path="/zadania/elita" element={<Elita />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
