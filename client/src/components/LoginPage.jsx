import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginDataError } from "../scripts";

function Homepage({ setIsUserLogged }) {
  const [users, setUsers] = useState([]);
  const [loginUser, setLoginUser] = useState({
    username: null,
    password: null,
  });

  const navigate = useNavigate();

  const updateInputData = (e) => {
    const { name, value } = e.target;
    setLoginUser((prevData) => ({ ...prevData, [name]: value }));
  };

  async function checkUser(e) {
    e.preventDefault();

    try {
      const res = await axios.get("http://localhost:8020/");
      const fetchedUsers = res.data.users;

      if (fetchedUsers) {
        const userFounded = fetchedUsers.find(
          (el) =>
            el.username === loginUser.username &&
            el.userPassword === loginUser.password
        );

        if (userFounded) {
          console.log("login");
          setIsUserLogged(true);
          navigate("/admin");
        } else {
          console.log("dati errati");
          loginDataError();
        }
      }
    } catch (error) {
      console.error("Errore:", error);
    }
  }

  return (
    <>
      <section className="flex flex-col h-screen justify-center items-center bg-slate-100">
        <form
          action=""
          className="bg-white p-5 rounded rounded-lg min-w-[400px] flex flex-col gap-2"
        >
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Username"
              onChange={updateInputData}
              name="username"
              className="loginInput"
            />
            <input
              type="text"
              placeholder="Password"
              onChange={updateInputData}
              name="password"
              className="loginInput"
            />
          </div>
          {loginUser.username}
          {loginUser.password}
          <button className="p-3 justify-center" onClick={checkUser}>
            Login
          </button>
        </form>
      </section>
    </>
  );
}

export default Homepage;
