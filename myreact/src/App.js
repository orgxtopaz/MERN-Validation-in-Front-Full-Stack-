import "./App.css";

import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //routes
import Forms from "./components/Forms";
import About from "./components/About";
import Contact from "./components/Contact";
import Delete from "./components/Delete";





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
        <Route  path="/Delete/:{val._id}"  component={Delete} />
       
      </Router>
    </div>
  );
}

export default App;
