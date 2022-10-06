import React, { useState, useEffect } from "react";
import docsModel from "../models/docs"
import TheEditor from "./editor";

export default function DocsList() {
    const [docs, setDocs] = useState([]);
    const [currentDoc, setCurrentDoc] = useState({_id: null, title:"Untitled", body:""});

    async function fetchDoc(e) {
        const id = e.target.value.toString();
        if (e.target.value !== "-99") {
            const doc = await docsModel.getOneDoc(id);
            setCurrentDoc(doc);
        }
    }

    useEffect(() => {
      (async () => {
        const allDocs = await docsModel.getAllDocs();
        setDocs(allDocs);
      })();
    }, [currentDoc]);

    return (
        <>
            <select onChange={fetchDoc}>
                <option value="-99" key="0">*New Document*</option>
                {docs.map((doc, index) => <option value={doc._id} key={index}>{doc.title}</option>)}
            </select>
            <TheEditor doc={currentDoc} />
        </>
    )
}