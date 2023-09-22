import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import LoginPage from "./components/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./components/Admin";
import AddEntry from "./components/AddEntry";
import EditEntry from "./components/EditEntry";
import Stats from "./components/Stats";

function App() {
  // Creo le variabili di stato per i clienti e gli ordini
  const [clients, setClients] = useState([]);
  const [entries, setEntries] = useState([]);
  const [isUserLogged, setIsUserLogged] = useState(false);

  // Richiamo i clienti e tutti gli ordini nel database
  useEffect(() => {
    const fn = async () => {
      try {
        const res = await axios.get("http://localhost:8020/");
        setClients(res.data.clients);
        setEntries(res.data.entries);
      } catch (error) {
        console.log(error);
      }
    };

    fn();
  }, [entries, clients]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<LoginPage setIsUserLogged={setIsUserLogged} />}
          ></Route>
          <Route
            path="/admin"
            element={
              <ProtectedRoute isUserLogged={isUserLogged}>
                <Admin
                  entries={entries}
                  clients={clients}
                  setEntries={setEntries}
                  setIsUserLogged={setIsUserLogged}
                />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/admin/:id"
            element={
              <ProtectedRoute isUserLogged={isUserLogged}>
                <Admin
                  entries={entries}
                  clients={clients}
                  setIsUserLogged={setIsUserLogged}
                />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/addentry"
            element={
              <ProtectedRoute isUserLogged={isUserLogged}>
                <AddEntry
                  entries={entries}
                  clients={clients}
                  setIsUserLogged={setIsUserLogged}
                  setEntries={setEntries}
                />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/editentry"
            element={
              <ProtectedRoute isUserLogged={isUserLogged}>
                <EditEntry
                  entries={entries}
                  clients={clients}
                  setIsUserLogged={setIsUserLogged}
                />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/stats"
            element={
              <ProtectedRoute isUserLogged={isUserLogged}>
                <Stats
                  entries={entries}
                  clients={clients}
                  setIsUserLogged={setIsUserLogged}
                  setEntries={setEntries}
                />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
