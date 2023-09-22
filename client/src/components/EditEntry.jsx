import { useParams } from "react-router-dom";
import Form from "./Form";

function EditEntry({ entries, clients }) {
  const action = "update";
  const params = useParams();
  const clientId = params.id;

  const editEntry = entries.filter((el) => el._id === clientId);

  return (
    <>
      <section className="flex flex-col p-5 w-full gap-2">
        <h2 className="text-2xl font-bold pb-2 border-b">
          {editEntry.length > 0
            ? `Modifica Intervento n° ${editEntry[0]._id}`
            : "Nessun intervento selezionato"}
        </h2>
        {editEntry.length > 0 ? (
          <Form
            entries={entries}
            clients={clients}
            editEntry={editEntry[0]}
            action={action}
          />
        ) : (
          <p>Nessun intervento da modificare.</p>
        )}
      </section>
    </>
  );
}

export default EditEntry;
