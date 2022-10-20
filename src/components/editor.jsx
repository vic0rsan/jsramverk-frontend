import React, { useState, useEffect } from "react";
import { TrixEditor } from "react-trix";
import { apiUrl } from "../config";
import docsModel from "../models/docs";
import textToPdf from "../models/pdf";
import mailModel from "../models/mail";
import "trix";
import "react-trix-rte";
import { io } from "socket.io-client";

export default function TheEditor({doc}) {
    const [value, setValue] = useState("");
    const [socket, setSocket] = useState(null);
    const [email, setEmail] = useState(null);

    function handleChange(html, text) {
        setValue(html);
    }

    function handleSave(event) {
        if (doc._id) {
            docsModel.saveCurrentDoc(doc._id, value);
        } else {
            docsModel.createCurrentDoc(value)
        }
    }

    function handlePdf(event) {
        textToPdf(value);
    }

    function setEditorContent(content, trigger) {
        let element = document.querySelector("trix-editor");
    
        element.value = "";
        element.editor.setSelectedRange([0, 0]);
        element.editor.insertHTML(content);
    } 

    function shareDocument() {
        mailModel.sendMail(doc._id, doc.title, email);
    }

    useEffect(() => {
        setSocket(io(apiUrl));
        return () => {
            if (socket) {
                socket.disconnect();
                console.log("Disconnected");
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (socket) {
            socket.emit("create", doc._id);
            console.log("connected");
            setEditorContent(doc.body)
            socket.on("doc", function(data) {
                setEditorContent(data.body);
            });
        }
    }, [socket, doc]);

    return (
        <>
            <div style={{backgroundColor: "lightblue", padding: "2em"}}>
                <div style={{textAlign: "center"}}>
                    <button style={{padding: "1em"}} onClick={handleSave}>💾 Save!</button>
                    <button style={{padding: "1em"}} onClick={handlePdf}>🖨️ Print!</button>
                </div>  
            </div>
            <div onKeyUp={() => {socket.emit("doc", {_id: doc._id, body: value})}}>
                <TrixEditor autoFocus={true} onChange={handleChange} />
            </div>
            <div style={{marginTop: "1em"}}>
                <label htmlFor="email">Share document to user (email): </label>
                <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" />
                <button onClick={shareDocument}>🤝 Share!</button>
            </div>
        </>
    )
  }