import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route} from "react-router-dom"; //routes
import Forms from "./components/Forms";
import About from "./components/About";
import Contact from "./components/Contact";
import Delete from "./components/Delete";
import Update from "./components/Update";
import View from "./components/View";

function App() {
  return (
    <>
      <div>
        <div className="pos-f-t">
          <nav className="navbar navbar-dark bg-dark">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarToggleExternalContent"
              aria-controls="navbarToggleExternalContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>


            
          </nav>
       <nav>

       <Router>
           
            {/* ROUTES LANG SAKALAM */}
            <Route exact path="/About" component={About} />
            <Route exact path="/Contact" component={Contact} />
            <Route exact path="/" component={Forms} />
            <Route exact path="/View/:viewId" component={View} />
            <Route exact path="/Delete/:deleteId" component={Delete} />
            <Route exact path="/Update/:updateId" component={Update} />
          </Router>
         </nav>
          
        </div>
      </div>
    </>
  );
}

export default App;
