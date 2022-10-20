import React from "react";
import Docs from "./docs";
import Login from "./login";

export default function Index() {
    return(
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