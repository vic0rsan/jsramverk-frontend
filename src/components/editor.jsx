import React, { useState } from "react";
import { TrixEditor } from "react-trix";
import docsModel from "../models/docs";
import "trix";
import "react-trix-rte";

export default function TheEditor({doc}) {
    const [value, setValue] = useState("");

    function handleChange(element, text) {
        setValue(text);
    }

    function handleSave(event) {
        if (doc._id) {
            docsModel.saveCurrentDoc(doc._id, value);
        } else {
            docsModel.createCurrentDoc(value)
        }
    }

    return (
        <>
            <div style={{backgroundColor: "lightblue", padding: "2em"}}>
                <button style={{margin: "0 auto", display: "block", padding: "1em" }} onClick={handleSave}>💾 Save!</button>
            </div>
            
            <TrixEditor autoFocus={true} onChange={handleChange}/>
        </>
    )
  }