export default function Info() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        Informacje o zajęciach
      </h1>

      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li>
          Start lub kontynuacja Waszej przygody z matematyką olimpijską – dla
          tych, którzy celują wyżej!
        </li>
        <li>
          Kontesty zadaniowe i wykłady na różnych poziomach, dopasowanych do
          Was – trzy grupy trudności
        </li>
        <li>Warsztaty lingwistyczne dla chętnych</li>
        <li>
          Kadra studentów nauk ścisłych, laureatów wielu konkursów
          matematycznych, olimpijczyków OM, w tym zeszłorocznej finalistki
        </li>
        <li>
          Okazja na zbudowanie więzi z innymi entuzjastami matematyki w Waszej
          szkole i bycie częścią społeczności matematycznej II LO
        </li>
      </ul>

      <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 text-yellow-800">
        <strong>Uwaga:</strong> jeśli pojawią się ogłoszenia, będą one
        zamieszczone w tym miejscu.
      </div>
    </div>
  );
}
