import { useState } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Mintpage from "./Mintpage";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./NavBar";
import "./App.css";

function App() {
  //using state management to keep up with the current account and any changes
  const [accounts, setAccounts] = useState([]);

  return (
    <div className="App">
      <NavBar accounts={accounts} setAccounts={setAccounts} />
      <Mintpage accounts={accounts} setAccounts={setAccounts} />
    </div>
  );
}

export default App;
