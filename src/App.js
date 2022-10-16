import React from "react";
import DocsList from "./components/docslist";
import Login from "./components/login";

export default function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>TheEditor</h1>
      </header>
      <main className="main">
        { sessionStorage.getItem("token") ?
          <DocsList />
            :
          <Login />
        }
      </main>
    </div>
  )
}