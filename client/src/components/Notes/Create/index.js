import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const CreateNote = () => {
  const [note, setNote] = useState({
    title: "",
    content: "",
    date: "",
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const submitNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const { title, content, date } = note;
        const newNote = { title, content, date };

        await axios.post("/api/notes", newNote, {
          headers: { Authorization: token },
        });

        return history.push("/");
      }
    } catch (error) {
      window.location.href = "/";
    }
  };

  return (
    <div className="create__note">
      <h2>Create Note</h2>
      <form onSubmit={submitNote}>
        <div className="row">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={note.title}
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <label htmlFor="content">Content</label>
          <textarea
            type="text"
            name="content"
            id="content"
            required
            value={note.content}
            rows="10"
            onChange={handleChange}
          />
        </div>
        <label htmlFor="date">Date: {note.date}</label>
        <div className="row">
          <input
            type="date"
            name="date"
            id="date"
            value={note.date}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CreateNote;
