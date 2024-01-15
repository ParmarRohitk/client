import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AddData from "./components/AddData";
import EditData from "./components/EditData";
import ViewData from "./components/ViewData";

const ResponseAPI = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/add">Add Data</Link>
            </li>
          </ul>
        </nav>

        <Route path="/add" component={AddData} />
        <Route path="/edit/:id" component={EditData} />
        <Route exact path="/responseapi" component={ViewData} />
      </div>
    </Router>
  );
};

export default ResponseAPI;
