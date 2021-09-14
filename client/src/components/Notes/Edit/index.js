import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import dateFormat from "dateformat";

const EditNote = ({ match }) => {
  const [note, setNote] = useState({
    title: "",
    content: "",
    date: "",
    id: "",
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
        const { title, content, date, id } = note;
        const newNote = { title, content, date };

        await axios.put(`/api/notes/${id}`, newNote, {
          headers: { Authorization: token },
        });

        return history.push("/");
      }
    } catch (error) {
      window.location.href = "/";
    }
  };

  useEffect(() => {
    const getNote = async () => {
      const token = localStorage.getItem("token");
      if (match.params.id) {
        const res = await axios.get(`/api/notes/${match.params.id}`, {
          headers: { Authorization: token },
        });
        setNote({
          title: res.data.title,
          content: res.data.content,
          date: new Date(res.data.date).toLocaleDateString(),
          id: res.data._id,
        });
      }
    };
    getNote();
  }, [match.params.id]);

  return (
    <div className="create__note">
      <h2>Edit Note</h2>
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
        <label htmlFor="date">
          Date: {dateFormat(note.date, "yyyy-mm-dd")}
        </label>
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

export default EditNote;
