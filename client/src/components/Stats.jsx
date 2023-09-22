import Header from "./Header";

import { reverseDate } from "../scripts";
import { useState } from "react";
import EntryInfoStats from "./entryInfoStats";

function Stats({ clients, entries }) {
  const [entryToView, setEntryToView] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);

  console.log(entryToView);

  function lastMonth(entries, months, monthsToExclude) {
    const today = new Date();
    const lastMonthsDate = new Date();
    const lastMonthsToExclude = new Date();

    lastMonthsDate.setMonth(today.getMonth() - months);
    lastMonthsToExclude.setMonth(today.getMonth() - monthsToExclude);

    const lastMonthEntries = entries.filter((el) => {
      const entryDate = new Date(el.dateEntry);
      return entryDate >= lastMonthsDate && entryDate <= lastMonthsToExclude;
    });

    return lastMonthEntries;
  }

  const findClientNameById = (id) => {
    const client = clients.find((client) => client._id === id);
    return client ? client.name + " " + client.surname : "-";
  };

  const activeSidebar = (el) => {
    setEntryToView(el);
    setShowSidebar(true);
  };

  return (
    <>
      <section className="flex flex-col h-screen overflow-hidden">
        <Header />
        <div className=" h-full relative">
          <h2 className="text-4xl py-2 border-b px-5">
            Resoconto degli ultimi mesi
          </h2>

          <div className="flex flex-row gap-5 h-full">
            <div className="grid grid-cols-3 py-5 gap-5 w-full items-start p-5">
              <EntryInfoStats
                lastMonth={lastMonth}
                entries={entries}
                findClientNameById={findClientNameById}
                setEntryToView={setEntryToView}
                reverseDate={reverseDate}
                activeSidebar={activeSidebar}
                title={"Nuovi"}
                monthsToView={1}
                monthExclude={0}
                bgColor={"bg-slate-100"}
              />

              <EntryInfoStats
                lastMonth={lastMonth}
                entries={entries}
                findClientNameById={findClientNameById}
                setEntryToView={setEntryToView}
                reverseDate={reverseDate}
                activeSidebar={activeSidebar}
                title={"di 1 mese"}
                monthsToView={3}
                monthExclude={1}
                bgColor={"bg-orange-100"}
              />

              <EntryInfoStats
                lastMonth={lastMonth}
                entries={entries}
                findClientNameById={findClientNameById}
                setEntryToView={setEntryToView}
                reverseDate={reverseDate}
                activeSidebar={activeSidebar}
                title={"di 3 mese"}
                monthsToView={12}
                monthExclude={3}
                bgColor={"bg-red-100"}
              />
            </div>
            <div
              className={`${
                showSidebar ? `flex` : `hidden`
              } top-0 h-full w-[400px]`}
              id="statsSidebar"
            >
              <div className="flex flex-col bg-white w-full h-full p-5 border-l">
                <h3 className="text-xl font-bold pb-2 border-b">
                  {findClientNameById(entryToView.clientId)}
                </h3>
                <div className="flex flex-row py-2 border-b">
                  <span className="p-2 rounded-lg bg-slate-200 w-full text-center font-bold">
                    {entryToView.typeEntry}
                  </span>
                </div>
                <ul className="py-2">
                  <li className="flex flex-row justify-between border-b py-2">
                    <span>Data:</span> {reverseDate(entryToView.dateEntry)}
                  </li>
                  <li className="flex flex-row justify-between border-b py-2">
                    <span>Operaio:</span> {entryToView.worker}
                  </li>
                  <li className="flex flex-row justify-between border-b py-2">
                    <span>Ore di lavoro:</span> {entryToView.duration}
                  </li>
                  <li className="flex flex-col py-2">
                    Note: {entryToView.notes}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Stats;
