import React, { useState } from "react";
import axios from "axios";
import Register from "../Register";
import { Alert } from "react-bootstrap";

const Login = ({ setIsLogin }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [onLogin, setOnLogin] = useState(false);
  const style = {
    visibility: onLogin ? "hidden" : "visible",
    opacity: onLogin ? 0 : 1,
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/login", {
        email: user.email,
        password: user.password,
      });
      setUser({ email: "", password: "" });
      localStorage.setItem("token", res.data.token);
      setIsLogin(true);
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <section className="login__page">
      <div className="login create__note" style={style}>
        <h1>Login</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            id="login__email"
            autoComplete="true"
            value={user.email}
            onChange={handleChange}
            name="email"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            id="login__password"
            autoComplete="true"
            value={user.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
          <p>
            New User? <span onClick={() => setOnLogin(true)}>Register Now</span>
          </p>
        </form>
      </div>
      <Register onLogin={onLogin} setOnLogin={setOnLogin} />
    </section>
  );
};

export default Login;
