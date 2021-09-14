import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import axios from "axios";

const HomeNote = () => {
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState("");
  const getNotes = async (token) => {
    const res = await axios.get("/api/notes", {
      headers: { Authorization: token },
    });
    setNotes(res.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);

    if (token) {
      getNotes(token);
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      if (token) {
        await axios.delete(`/api/notes/${id}`, {
          headers: { Authorization: token },
        });
        getNotes(token);
      }
    } catch (error) {
      window.location.href = "/";
    }
  };

  return (
    <div className="note__wrapper">
      {notes.map((note) => (
        <div className="card" key={note._id}>
          <h1 title={note.title}>{note.title}</h1>
          <div className="text__wrapper">
            <p title="Note Description">{note.content}</p>
          </div>
          <p className="date">{format(note.date)}</p>
          <div className="card__footer">
            {note.name}
            <Link to={`edit/${note._id}`}>Edit</Link>
          </div>
          <button className="close" onClick={() => handleDelete(note._id)}>
            x
          </button>
        </div>
      ))}
    </div>
  );
};

export default HomeNote;
