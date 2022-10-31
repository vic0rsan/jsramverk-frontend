import "setimmediate";
import React, { useState, useEffect } from "react";
import { TrixEditor } from "react-trix";
import { apiUrl } from "../config";
import docsModel from "../models/docs";
import textToPdf from "../models/pdf";
import mailModel from "../models/mail";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import "trix";
import "react-trix-rte";
import { io } from "socket.io-client";

export default function TheEditor({doc, state, toggleCode, test=false, testcode=null}) {
    const [value, setValue] = useState("");
    const [socket, setSocket] = useState(null);
    const [email, setEmail] = useState(null);

    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");

    function handleChange(html) {
        setValue(html);
    }

    function handleSave() {
        if (doc._id) {
            docsModel.saveCurrentDoc(doc._id, value);
        } else {
            docsModel.createCurrentDoc(value)
        }
    }

    function handlePdf() {
        if (test) {
            textToPdf(doc.body);
        } else {
            textToPdf(value);
        }
       
    }

    function handleCode(code) {
        setCode(code);
    }

    async function submitCode() {
        await fetch("https://execjs.emilfolino.se/code", {
            body: JSON.stringify({code: btoa(code)}),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
        .then(function (response) {
            return response.json();
        })
        .then(function(result) {
            let decodedOutput = atob(result.data);
            setOutput(decodedOutput);
        });
        await docsModel.createCurrentDoc(code, true);
    }

    function setEditorContent(content, trigger) {
        let element;
        if (state && !test) {
            element = document.getElementsByClassName("cm-content");
            element[0].innerHTML = "";
            element[0].innerHTML = content;
        } else if (!test) {
            element = document.querySelector("trix-editor");
            element.value = "";
            element.editor.setSelectedRange([0, 0]);
            element.editor.insertHTML(content);
        }
    } 

    function shareDocument() {
        mailModel.sendMail(doc._id, doc.title, email);
    }

    useEffect(() => {
        setSocket(io(apiUrl));
            if (socket) {
                socket.disconnect();
                console.log("Disconnected");
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doc]);

    useEffect(() => {
        if (socket) {
            socket.emit("create", doc._id);
            console.log("connected");
            socket.on("doc", function(data) {
                setEditorContent(data.body);
            });
            setEditorContent(doc.body);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doc, socket]);

    return (
        <>
            <div style={{backgroundColor: "lightblue", padding: "2em"}}>
                <div style={{textAlign: "center"}}>
                    <button style={{padding: "1em"}} data-testid="save" onClick={handleSave}>💾 Save</button>
                    <button style={{padding: "1em"}} data-testid="print" onClick={handlePdf}>🖨️ Print</button>
                    {toggleCode}
                </div>  
            </div>
            {state ?
                <div>
                    <CodeMirror
                    value={testcode || code}
                    height="200px"
                    extensions={[javascript({ jsx: true })]}
                    onChange={handleCode}
                    data-testid="codebox"
                    />
                    <span style={{backgroundColor: "black", color: "lime", display: "flex", height: "10em", margin: "0 auto"}}>{`>${output}`}</span>
                    <br/>
                    <button onClick={() => {submitCode(); console.log(output);}} style={{padding: "1em", margin: "1em"}} data-testid="run">📨 Run</button>
                </div>
                :
                <div onKeyUp={() => {socket.emit("doc", {_id: doc._id, body: value})}}>
                    <TrixEditor autoFocus={true} onChange={handleChange} />
                </div>
            }
            
            <div style={{marginTop: "1em"}}>
                <label htmlFor="email">Share document to user (email): </label>
                <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" />
                <button onClick={shareDocument}>🤝 Share!</button>
            </div>
        </>
    )
  }