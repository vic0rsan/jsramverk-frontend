import Trix from "trix";
import React, { useState } from "react";
import { ReactTrixRTEInput } from "react-trix-rte";

export default function TrixEditor(props) {
  const [value, setValue] = useState("");

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleSave(event) {
    console.log(value);
  }

  return (
    <>
      <div style={{backgroundColor: "lightblue", padding: "2em"}}>
        <button style={{margin: "0 auto", display: "block", padding: "1em" }} onClick={handleSave}>💾 Save!</button>
      </div>
      <ReactTrixRTEInput
        defaultValue="Enter some text!"
        onChange={handleChange}
      />
    </>
  )
}