import { BrowserRouter, Routes, Route, NavLink, Link } from "react-router-dom";
import "katex/dist/katex.min.css";
import Landing from "./pages/Landing";
import Timetable from "./pages/Timetable";
import Tasks, { Mlodsza, Starsza, Elita } from "./pages/Tasks";
import Match from "./pages/Match";
import { useCamp } from "./context/CampContext";
import Lectures, { WSM, ZMM, PS } from "./pages/Lectures";
import TasksArchive, { Mlodsza1, Starsza1, Elita1, Mlodsza2, Starsza2, Elita2 } from "./pages/Archive";

export default function App() {
  const camp = useCamp();
  const link = "px-3 py-2 rounded hover:bg-gray-100";
  const active = ({ isActive }: { isActive: boolean }) =>
    isActive ? link + " bg-gray-200" : link;

  return (
    <BrowserRouter>
      <div className="max-w-5xl mx-auto p-4 flex flex-col min-h-screen">
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
            <NavLink className={active} to="/wyklady">Wykłady</NavLink>
            {/* <NavLink className={active} to="/wyniki">Wyniki</NavLink> */}
            <NavLink className={active} to="/mecz">Mecz Matematyczny</NavLink>
            
          </div>
        </nav>

        {/* Main content */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/kalendarz" element={<Timetable />} />
            <Route path="/zadania" element={<Tasks />} />
            {/* <Route path="/wyniki" element={<Scores />} /> */}
            <Route path="/mecz" element={<Match />} />
            <Route path="/zadania/mlodsza" element={<Mlodsza />} />
            <Route path="/zadania/starsza" element={<Starsza />} />
            <Route path="/zadania/elita" element={<Elita />} />
            <Route path="/wyklady" element={<Lectures />} />
            <Route path="/wyklady/wsm" element={<WSM />} />
            <Route path="/wyklady/zmm" element={<ZMM />} />
            <Route path="/wyklady/ps" element={<PS />} />
            <Route path="/archiwum" element={<TasksArchive />} />
            <Route path="/archiwum/mlodsza1" element={<Mlodsza1 />} />
            <Route path="/archiwum/starsza1" element={<Starsza1 />} />
            <Route path="/archiwum/elita1" element={<Elita1 />} />
            <Route path="/archiwum/mlodsza2" element={<Mlodsza2 />} />
            <Route path="/archiwum/starsza2" element={<Starsza2 />} />
            <Route path="/archiwum/elita2" element={<Elita2 />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="mt-8 border-t pt-4 text-center text-sm text-gray-600">
          <div>
            Strona stworzona przez <span className="font-medium">Wojciecha Wójcika </span>
          </div>
          <div className="mt-2">
            Kadra:{" "}
            <span className="font-medium">Tomasz Martyński</span>,{" "}
            <span className="font-medium">Wojciech Wójcik</span>,{" "}
            <span className="font-medium">Daniel Pazdro</span>,{" "}
            <span className="font-medium">Anna Martyńska</span>,{" "}
            <span className="font-medium">Daniel Kopacz</span>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
