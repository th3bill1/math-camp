import { Link } from "react-router-dom";

export default function Match() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Mecz Matematyczny</h1>
      </header>

      {/* Ogłoszenie / zapowiedź */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-blue-900">
          <strong>Zapowiedź:</strong> w trakcie wieczoru i nocy poprzedzających mecz
          drużyny będą otrzymywać od kadry <em>podpowiedzi</em> do zadań.
          Czas na pracę nad zadaniami trwa aż do rozpoczęcia meczu
          (szczegóły w <Link to="/kalendarz" className="underline">kalendarzu</Link>).
        </p>
      </div>

      <div className="text-center">
        <Link
          to="/mecz/zadania"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Zobacz zadania Meczu Matematycznego
        </Link>
      </div>

      {/* Zasady – sekcje */}
      <section className="space-y-6">
        <div className="rounded-2xl border p-6">
          <h2 className="text-xl font-semibold mb-3">Skład drużyn</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-800">
            <li>Dzielimy grupę na <strong>dwie drużyny</strong>.</li>
            <li>
              <strong>Kapitanowie</strong> to dwie osoby z największą liczbą punktów w swojej grupie.
            </li>
            <li>
              Kapitanowie <strong>wybierają naprzemiennie</strong> osoby do swoich drużyn.
            </li>
          </ol>
        </div>

        <div className="rounded-2xl border p-6">
          <h2 className="text-xl font-semibold mb-3">Przed meczem</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800">
            <li>Obie drużyny otrzymują <strong>te same zadania</strong> do rozwiązania.</li>
            <li>
              <strong>Czas pracy</strong> nad zadaniami trwa <strong>do rozpoczęcia meczu</strong> (zobacz{" "}
              <Link to="/kalendarz" className="underline">kalendarz</Link>).
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border p-6">
          <h2 className="text-xl font-semibold mb-3">Zasady w trakcie meczu</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-800">
            <li>
              Kapitanowie walczą w <strong>„Palcu Śmierci”</strong> o prawo rozpoczęcia meczu.
            </li>
            <li>
              Drużyny <strong>naprzemiennie nominują przeciwników</strong> do rozwiązania zadania przy tablicy.
            </li>
            <li>
              Drużyna nominowana może <strong>przyjąć zadanie</strong> lub <strong>oddać</strong> je
              drużynie przeciwnej.
            </li>
            <li>
              <strong>Przeciwnicy</strong> drużyny rozwiązującej wybierają osobę, która podejdzie do tablicy.
              Każda osoba może być wybrana <strong>raz</strong> (chyba że wszyscy już byli wybierani).
            </li>
            <li>
              Na rozwiązanie zadania przy tablicy jest <strong>10 minut </strong>(chyba że kadra uzna, że rozwiązanie idzie w dobrym kierunku).
              Po wyznaczonym czasie zadanie zostaje uznane za <strong>nierozwiązane</strong>.
            </li>
            <li>
              Osoba przy tablicy może zostać <strong>wymieniona </strong> na inną osobę z drużyny. Nową osobę ponownie wybierają <strong>przeciwnicy</strong>.
              Wymiana kosztuje <strong>1 + 2x punktów</strong>, gdzie <strong>x </strong> to liczba już dokonanych wymian w danym zadaniu.
            </li>
          </ol>
        </div>

        <div className="rounded-2xl border p-6">
          <h2 className="text-xl font-semibold mb-3">Punktacja i zakończenie</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800">
            <li>
              Za rozwiązanie zadania drużyna zdobywa <strong>0–10 punktów </strong>
              (o liczbie punktów decyduje kadra).
            </li>
            <li>
              Jeśli drużyna <strong>nominująca</strong> dane zadanie <strong>nie zdoła </strong>
              go rozwiązać przy tablicy, otrzymuje <strong>punkty ujemne</strong>.
            </li>
            <li>
              Gra trwa, dopóki <strong>obie drużyny</strong> nie zgodzą się zakończyć nominowania
              (np. gdy wyczerpią się przygotowane rozwiązania).
            </li>
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <p className="text-yellow-900">
            <strong>Wskazówka:</strong> warto, aby <strong>wszyscy</strong> w drużynie znali rozwiązania
            zadań przygotowanych przez swoją drużynę.
          </p>
        </div>
      </section>
    </div>
  );
}

