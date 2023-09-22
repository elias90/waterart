import { useState } from "react";
import axios from "axios";

function AddClient({ setShowAddClient }) {
  const [newClientData, setNewCLientData] = useState({
    name: "",
    surname: "",
    address: "",
    city: "",
    email: "",
    phone: "",
  });

  const updateInputData = (event) => {
    const { name, value } = event.target;
    setNewCLientData((prevData) => ({ ...prevData, [name]: value }));
  };

  async function addNewClient(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8020/addClient/",
        newClientData
      );
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-row justify-between items-center pb-4">
          <h3 className="">Aggiungi nuovo cliente</h3>
          {/* <div
            className="text-red-600 cursor-pointer"
            onClick={(e) => {
              setShowAddClient(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clip-rule="evenodd"
              />
            </svg>
          </div> */}
        </div>
        <form
          action=""
          className="grid grid-cols-2 gap-2 w-full"
          onSubmit={addNewClient}
        >
          <input
            type="text"
            placeholder="Nome"
            name="name"
            onChange={updateInputData}
            required
          />
          <input
            type="text"
            placeholder="Cognome"
            name="surname"
            onChange={updateInputData}
            required
          />
          <input
            type="text"
            placeholder="Via"
            name="address"
            onChange={updateInputData}
            className=" col-span-2"
            required
          />
          <input
            type="text"
            placeholder="Città"
            name="city"
            onChange={updateInputData}
            className=" col-span-2"
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={updateInputData}
          />
          <input
            type="number"
            placeholder="Telefono"
            name="phone"
            onChange={updateInputData}
            required
          />
          <button className="justify-center col-span-2">Carica Cliente</button>
        </form>
      </div>
    </>
  );
}

export default AddClient;
