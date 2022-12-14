import "setimmediate";
import React, { useState, useEffect } from "react";
import docsModel from "../models/docs";
import graphModel from "../models/graph";
import TheEditor from "./editor";

export default function Docs() {
    const [docs, setDocs] = useState([]);
    const [currentDoc, setCurrentDoc] = useState({_id: null, title:"Untitled", body:""});
    const [state, setState] = useState(false);

    async function fetchDoc(e) {
        const id = e.target.value.toString();
        if (e.target.value !== "-99") {
            const doc = await docsModel.getOneDoc(id);
            setCurrentDoc(doc);
        } else {
            setCurrentDoc({_id: null, title:"Untitled", body:""});
        }
    }

    useEffect(() => {
      (async () => {
        const allDocs = await graphModel.graphUserDocs(state);
        setDocs(allDocs);
      })();
    }, [currentDoc, state]);

    return (
        <>
            <select onChange={fetchDoc}>
                <option value="-99" key="0">*New Document*</option>
                {docs.map((doc, index) => <option value={doc._id} key={index}>{doc.title}</option>)}
            </select>
            <TheEditor doc={currentDoc} state={state} toggleCode={<button style={{padding: "1em"}} data-testid="code" onClick={() => setState(value => !value)}>🤖 Code</button>}/>
        </>
    )
}