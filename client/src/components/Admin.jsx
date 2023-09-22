import Header from "./Header";
import Sidebar from "./Sidebar";
import Resume from "./Resume";
import AddEntry from "./AddEntry";
import EditEntry from "./EditEntry";
import { useState } from "react";

import { reverseDate } from "../scripts";

function Admin({ clients, entries, setEntries, setIsUserLogged }) {
  const [clientIdResume, setClientIdResume] = useState("");
  const [currentSection, setCurrentSection] = useState("showResume");

  const numberOfEntries = (id) => {
    const totalEntries = entries.filter(
      (entry) => entry.clientId === id
    ).length;
    return totalEntries;
  };

  const renderSection = () => {
    switch (currentSection) {
      case "showResume":
        return (
          <Resume
            entries={entries}
            setEntries={setEntries}
            clients={clients}
            clientIdResume={clientIdResume}
            setCurrentSection={setCurrentSection}
            numberOfEntries={numberOfEntries}
            reverseDate={reverseDate}
          />
        );
      case "showEditEntry":
        return (
          <EditEntry
            entries={entries}
            clients={clients}
            setCurrentSection={setCurrentSection}
          />
        );
      case "showAddEntry":
        return (
          <AddEntry clients={clients} setCurrentSection={setCurrentSection} />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <section className="flex flex-col h-screen">
        <Header
          setCurrentSection={setCurrentSection}
          setIsUserLogged={setIsUserLogged}
        />
        <section className="flex flex-row h-full overflow-hidden">
          <Sidebar
            entries={entries}
            clients={clients}
            setCurrentSection={setCurrentSection}
            setClientIdResume={setClientIdResume}
            numberOfEntries={numberOfEntries}
          />
          {renderSection()}
        </section>
      </section>
    </>
  );
}

export default Admin;
