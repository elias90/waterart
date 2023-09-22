import Form from "./Form";

function AddEntry({ clients, setCurrentSection, setEntries }) {
  return (
    <>
      <section className="fle flex-col p-5 w-full">
        <div className="flex flex-row justify-between pb-2 border-b grow">
          <h2 className="text-2xl font-bold">Aggiungi Nuovo</h2>
          <button
            className="flex flex-row gap-1 cursor-pointer p-2 bg-slate-200 rounded-lg text-black"
            onClick={(e) => setCurrentSection("showResume")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Chiudi
          </button>
        </div>
        <Form clients={clients} setEntries={setEntries} />
      </section>
    </>
  );
}

export default AddEntry;
