import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Resume({
  clients,
  entries,
  setEntries,
  clientIdResume,
  setCurrentSection,
  numberOfEntries,
  reverseDate,
}) {
  let resumesToShow = [];
  let clientInfo = [];

  const [newOrderSort, setNewOrderSort] = useState("");

  const findClientNameById = (id) => {
    const client = clients.find((client) => client._id === id);
    return client ? client.name + " " + client.surname : "-";
  };

  const findCityById = (id) => {
    const client = clients.find((client) => client._id === id);
    return client ? client.city : "-";
  };

  if (clientIdResume) {
    resumesToShow = entries.filter((el) => el.clientId === clientIdResume);
    clientInfo = clients.filter((el) => el._id === clientIdResume);
  }

  function changeStatus() {
    setCurrentSection("showEditEntry");
  }

  async function deleteEntry(id) {
    try {
      const res = await axios.delete(`http://localhost:8020/deleteEntry/${id}`);
      window.location.reload(true);
    } catch (error) {
      console.log(error);
    }
  }

  function orderEntries(entries, order) {
    switch (order) {
      case "Date":
        return entries.sort(
          (a, b) => new Date(a.dateEntry) - new Date(b.dateEntry)
        );
      case "Worker":
        return entries.sort((a, b) => a.worker.localeCompare(b.worker));
      case "Type":
        return entries.sort((a, b) => a.typeEntry.localeCompare(b.typeEntry));
      default:
        return entries;
    }
  }

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-col">
          {clientIdResume ? (
            <div className="flex flex-col gap-5 p-5  border-b">
              <div className="flex flex-row justify-between pb-2 border-b items-center">
                <div className="flex flex-col gap-2">
                  <h2 className="text-3xl font-bold">
                    {clientInfo[0].name} {clientInfo[0].surname}
                  </h2>
                </div>
                <div>
                  <span className="p-2 rounded-lg bg-slate-100">
                    Interventi attivi:{" "}
                    <strong>{numberOfEntries(clientInfo[0]._id)}</strong>
                  </span>
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <span className="p-2 rounded rounded-lg bg-slate-100 flex flex-row gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  {clientInfo[0].address} {clientInfo[0].city}{" "}
                </span>
                <span className="p-2 rounded rounded-lg bg-slate-100 flex flex-row gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                  {clientInfo[0].phone}
                </span>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col gap-5 p-5 w-full overflow-y-scroll h-full grow">
          {resumesToShow == 0 && (
            <div className="flex flex-row justify-end items-center gap-2">
              <span>Ordina per:</span>
              <select
                name=""
                id=""
                onChange={(e) => setNewOrderSort(e.target.value)}
                className="w-1/3"
              >
                <option value="Date">Data</option>
                <option value="Type">Tipologia</option>
                <option value="Worker">Worker</option>
              </select>
            </div>
          )}
          {clientIdResume === "" && entries.length === 0
            ? "Non ci sono interventi da visualizzare."
            : clientIdResume !== "" && resumesToShow.length === 0
            ? "Non ci sono dati per questo cliente."
            : (resumesToShow.length !== 0
                ? resumesToShow
                : orderEntries(entries, newOrderSort)
              ).map((el, i) => (
                <div
                  className="flex flex-col p-3 border rounded-lg w-full gap-3 hover:shadow-lg ease-in-out duration-200"
                  key={i}
                >
                  <div className="flex flex-row justify-between items-center">
                    <h3 className="text-xl">
                      <strong>
                        {!clientIdResume &&
                          findClientNameById(el.clientId) + ` / `}
                      </strong>{" "}
                      <span>
                        {!clientIdResume && findCityById(el.clientId)}
                      </span>
                    </h3>
                    <span
                      className={`${
                        el.typeEntry == "Ordine"
                          ? "bg-green-100 text-green-900 "
                          : "bg-blue-100  text-blue-900"
                      } p-1 rounded-lg text-s px-2`}
                    >
                      {el.typeEntry}
                    </span>
                  </div>
                  <div>
                    <h4>
                      {" "}
                      <strong>Intervento n° {el._id}</strong>
                    </h4>
                  </div>
                  <div className="flex flex-col gap-3 p-3 bg-slate-100 rounded-lg">
                    <div className="py-1">
                      <strong>Note:</strong>
                      <p className="mt-2">{el.notes}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-row gap-2">
                        <div className="flex flex-row gap-2">
                          <span className="py-2 text-xs">Data</span>
                          <span className="p-2 rounded-lg bg-slate-200 font-semibold text-xs">
                            {reverseDate(el.dateEntry)}
                          </span>
                        </div>
                        <div className="flex flex-row gap-2">
                          <span className="py-2 text-xs">Operaio</span>
                          <span className="p-2 rounded-lg bg-slate-200 font-semibold text-xs">
                            {el.worker}
                          </span>
                        </div>
                        <div className="flex flex-row gap-2">
                          <span className="py-2 text-xs">Ore di lavoro</span>
                          <span className="p-2 rounded-lg bg-slate-200 font-semibold text-xs">
                            {el.workDuration}
                          </span>
                        </div>
                        s
                      </div>
                      <div className="flex flex-row gap-2">
                        <Link to={"/admin/" + el._id}>
                          <button
                            className="bg-blue-700 p-2 text-xs"
                            onClick={changeStatus}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                            Modifica
                          </button>
                        </Link>
                        <button
                          className="bg-red-700 p-2 text-xs"
                          onClick={() => deleteEntry(el._id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          Cancella
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
}

export default Resume;
