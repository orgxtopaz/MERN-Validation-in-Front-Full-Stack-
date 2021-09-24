import "./App.css";

import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //routes
import Forms from "./components/Forms";
import About from "./components/About";
import Contact from "./components/Contact";
import Delete from "./components/Delete";
import Update from "./components/Update";
import View from "./components/View";






function App() {

  return (
    <div className="App">
      <Router>
        <li>
          <Link to={"/About"}> About</Link>
          <Link to={"/Contact"}>Contact</Link>
          <Link to={"/"}>Home</Link>
          
       
        </li>
      


        {/* ROUTES LANG SAKALAM */}
        <Route exact path="/About" component={About} />
        <Route  exact path="/Contact" component={Contact} />
        <Route  exact path="/"  component={Forms} />
        <Route  exact path="/View/:viewId"  component={View} />
        <Route  exact path="/Delete/:deleteId"  component={Delete} />
        <Route  exact path="/Update/:updateId"  component={Update} />
       
       
      </Router>
    </div>
  );
}

export default App;
