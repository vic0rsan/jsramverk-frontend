import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./components/auth";

import Invite from "./components/invite";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/invite" element={<Invite />} />
      </Routes>
    </BrowserRouter>
  )
}