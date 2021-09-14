import React, { useState } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";

const Register = ({ onLogin, setOnLogin }) => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const style = {
    visibility: onLogin ? "visible" : "hidden",
    opacity: onLogin ? 1 : 0,
  };
  const handleChannge = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/register", {
        username: user.name,
        email: user.email,
        password: user.password,
      });
      setUser({ name: "", email: "", password: "" });
      setOnLogin(false);
      setError(res.data.msg);
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <section>
      <div className="register create__note" style={style}>
        <h1>Register</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Enter your name"
            id="registration__name"
            autoComplete="true"
            value={user.name}
            onChange={handleChannge}
            name="name"
            required
          />

          <input
            type="email"
            placeholder="Enter your email"
            id="registration__email"
            autoComplete="true"
            value={user.email}
            onChange={handleChannge}
            name="email"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            id="registration__password"
            autoComplete="true"
            value={user.password}
            onChange={handleChannge}
            required
          />
          <button type="submit">Register</button>
          <p>
            Already have an account?{" "}
            <span onClick={() => setOnLogin(false)}>Login</span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
