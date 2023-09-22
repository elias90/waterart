import axios from "axios";
import { useEffect, useState } from "react";
import { fetchData } from "../scripts";

function Form({ clients, editEntry, action, setEntries }) {
  const today = new Date().toISOString().split("T")[0];

  //
  const getDefaultValues = () => ({
    clientId: "",
    typeEntry: "",
    workDuration: "",
    dateEntry: "",
    worker: "",
    notes: "",
  });

  // Prendo i valori da aggiornare dalle props
  const getUpdatedValues = (editClient) => ({
    clientId: editEntry.clientId || "",
    typeEntry: editEntry.typeEntry || "",
    workDuration: editEntry.workDuration || "",
    dateEntry:
      editEntry.dateEntry.split("/").reverse().join("-").slice(0, 10) || "",
    worker: editEntry.worker || "",
    notes: editEntry.notes || "",
  });

  // Creo la variabile di stato
  // Verifico quale azione deve effettuare il form
  // Se è update -> Richiamo la funzione e gli passo tramite props l'entry da modificare
  // Se non è updatr -> Richiamo la funzione che imposta i valori vuoti
  const [formData, setFormData] = useState(() => {
    //console.log(action)
    //console.log(props.productToEdit)
    if (action === "update" && editEntry) {
      //console.log('ok')
      return getUpdatedValues(editEntry);
    }
    return getDefaultValues();
  });

  // Funzione che prende i nuovi valori dagli input e aggirna la variabile FormData con quelli nuovi
  const updateInputData = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Invio la new entry tramite axios
  async function sendNewEntry(e, setEntries, entries) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8020/addEntry/",
        formData
      );
      if (response.status === 200) {
        fetchData(setEntries, entries);
        setFormData(getDefaultValues());
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Aggiorno l'entry da modificare tramite axios
  const updateEntry = async (event, setEntries, entries) => {
    event.preventDefault();
    const entryId = editEntry._id;
    //console.log(entryId)
    try {
      const response = await axios.patch(
        "http://localhost:8020/editEntry/" + entryId,
        formData
      );
      if (response.status === 200) {
        fetchData(setEntries, entries);
        setFormData(getDefaultValues());
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect((setEntries, entries) => {
    fetchData(setEntries, entries);
  }, []);

  return (
    <>
      <div className="flex flex-col py-5 w-full gap-5">
        <form
          action=""
          className="grid grid-cols-2 gap-2 w-full"
          onSubmit={action == "update" ? updateEntry : sendNewEntry}
        >
          <select
            name="clientId"
            id=""
            defaultValue={formData.clientId}
            placeholder="Seleziona Cliente"
            onChange={updateInputData}
          >
            <option value="" key={0} disabled>
              Seleziona Cliente
            </option>
            {clients &&
              clients.map((el, i) => (
                <option value={el._id} className="p-2" key={i + 1}>
                  {el.name} {el.surname} // {el._id}
                </option>
              ))}
          </select>
          <select
            name="typeEntry"
            id=""
            value={formData.typeEntry}
            onChange={updateInputData}
          >
            <option value="" disabled>
              Tipologia Intervento
            </option>
            <option value="Assistenza">Assistenza</option>
            <option value="Ordine">Ordine</option>
          </select>
          <input
            type="Number"
            placeholder="Durata Intervento"
            name="workDuration"
            className="grow"
            value={formData.workDuration}
            onChange={updateInputData}
          />
          <input
            type="date"
            placeholder=""
            name="dateEntry"
            className="grow"
            value={formData.dateEntry}
            onChange={updateInputData}
            max={today}
          />
          <input
            type="text"
            placeholder="Operaio"
            name="worker"
            value={formData.worker}
            onChange={updateInputData}
          />

          <textarea
            type="text"
            placeholder="Inserisci i dettagli dell'intervento"
            name="notes"
            className="min-h-[200px] col-span-2"
            value={formData.notes}
            onChange={updateInputData}
          />
          <div className="flex flex-row col-span-2 justify-end">
            <button className="self-end bg-emerald-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                />
              </svg>
              {action == "update" ? "Aggiorna Intervento" : "Carica Intervento"}
            </button>
          </div>
        </form>

        <div>{formData.typeEntry}</div>
      </div>
    </>
  );
}

export default Form;
