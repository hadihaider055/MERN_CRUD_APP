import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Login from "./components/Login";
import Notes from "./components/Notes";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const userVerification = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const verified = await axios.get("/users/verify", {
          headers: { Authorization: token },
        });
        setIsLogin(verified.data);
        if (verified.data === false) return localStorage.clear();
      } else {
        setIsLogin(false);
      }
    };
    userVerification();
  }, []);

  return (
    <div className="App">
      {isLogin ? (
        <Notes setIsLogin={setIsLogin} />
      ) : (
        <Login setIsLogin={setIsLogin} />
      )}
    </div>
  );
}

export default App;
