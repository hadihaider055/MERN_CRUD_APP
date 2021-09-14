import React from "react";
import Header from "../Header";
import CreateNote from "./Create";
import EditNote from "./Edit";
import HomeNote from "./Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
const Notes = ({ setIsLogin }) => {
  return (
    <Router>
      <div className="notes__page">
        <Header setIsLogin={setIsLogin} />
        <section>
          <Route exact path="/" component={HomeNote} />
          <Route exact path="/create" component={CreateNote} />
          <Route exact path="/edit/:id" component={EditNote} />
        </section>
      </div>
    </Router>
  );
};

export default Notes;
