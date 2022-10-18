import React from "react";
import Docs from "./components/docs";
import Login from "./components/login";

export default function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>TheEditor</h1>
      </header>
      <main className="main">
        { sessionStorage.getItem("token") ?
          <Docs />
            :
          <Login />
        }
      </main>
    </div>
  )
}