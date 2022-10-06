import React from "react";
import DocsList from "./components/docslist";

export default function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>TheEditor</h1>
      </header>
      <main>
        <DocsList />
      </main>
    </div>
  )
}