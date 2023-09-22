import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddClient from "./AddClient";

function Sidebar({ clients, entries, setCurrentSection, setClientIdResume }) {
  const [clientsFiltered, setClientsFiltered] = useState([]);
  const [showAddClient, setShowAddClient] = useState(false);
  const [clientFoundedText, setClientFoundedText] = useState("");

  const filterClients = (e) => {
    const clientToFilter = e.target.value.toLowerCase();
    const clientFiltered = clients.filter((el) =>
      el.name.toLowerCase().includes(clientToFilter)
    );
    setClientsFiltered(clientFiltered);
    clientFiltered == ""
      ? setClientFoundedText("Nessun cliente trovato")
      : setClientFoundedText(null);
    const clientsList = document.getElementById("clientList");
    clientFiltered == ""
      ? clientsList.classList.add("hidden")
      : clientsList.classList.remove("hidden");
  };

  const numberOfEntries = (id) => {
    const totalEntries = entries.filter(
      (entry) => entry.clientId === id
    ).length;
    return totalEntries;
  };

  function resumeClientToShow(e, id) {
    e.preventDefault();
    setClientIdResume(id);
    setCurrentSection("showResume");
  }

  function showAddClientFunction(e) {
    e.preventDefault();
    setShowAddClient(true);
    e.target.classList.add("hidden");
  }

  return (
    <div className="flex flex-col w-[400px] border-r h-full gap-5 bg-slate-50">
      <div className="flex flex-col gap-5 flex-grow overflow-y-auto p-5 pb-0">
        <div>
          <input
            type="text"
            placeholder="Cerca cliente..."
            className="w-full"
            onChange={filterClients}
          />
        </div>
        <div>
          <div className="border-b pb-2 flex flex-row justify-between items-center">
            <h3 className="text-2xl">Clienti</h3>
            <span
              className="cursor-pointer"
              onClick={(e) => {
                resumeClientToShow(e, "");
              }}
            >
              Vedi Tutti
            </span>
          </div>
          <div id="clientList">
            {(clientsFiltered.length > 0 ? clientsFiltered : clients).map(
              (el) => (
                <div
                  className="flex flex-row justify-between py-2 border-b cursor-pointer hover:bg-white cursor-pointer"
                  key={el._id}
                  onClick={(e) => resumeClientToShow(e, el._id)}
                >
                  <span className="text-sm">
                    {el.name} {el.surname}
                  </span>
                  <span className="flex flex-row items-center justify-center w-6 h-6 bg-slate-200 rounded-full text-xs">
                    {numberOfEntries(el._id)}
                  </span>
                </div>
              )
            )}
          </div>
          <span className=" pt-5">{clientFoundedText}</span>
        </div>
      </div>

      {showAddClient && (
        <div className="flex-shrink-0 p-5 border-t ">
          <AddClient setShowAddClient={setShowAddClient} />
        </div>
      )}

      <button
        className="w-full flex flex-row gap-3 justify-center self-end rounded-none"
        onClick={showAddClientFunction}
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
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Aggiungi nuovo cliente
      </button>
    </div>
  );
}

export default Sidebar;
