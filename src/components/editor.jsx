import React, { useState, useEffect } from "react";
import { TrixEditor } from "react-trix";
import docsModel from "../models/docs";
import "trix";
import "react-trix-rte";
import { io } from "socket.io-client";

export default function TheEditor({doc}) {
    const [value, setValue] = useState("");
    const [socket, setSocket] = useState(null);

    function handleChange(html, text) {
        setValue(text);
    }

    function handleSave(event) {
        console.log(doc._id);
        if (doc._id) {
            docsModel.saveCurrentDoc(doc._id, value);
        } else {
            docsModel.createCurrentDoc(value)
        }
    }

    function setEditorContent(content, trigger) {
        let element = document.querySelector("trix-editor");
    
 
        element.value = "";
        element.editor.setSelectedRange([0, 0]);
        
        element.editor.insertHTML(content);
    } 

    useEffect(() => {
        setSocket(io("https://jsramverk-editor-gusu20.azurewebsites.net/"));
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
                <button style={{margin: "0 auto", display: "block", padding: "1em" }} onClick={handleSave}>💾 Save!</button>
            </div>
            <div onKeyUp={() => {socket.emit("doc", {_id: doc._id, body: value})}}>
                <TrixEditor autoFocus={true} onChange={handleChange} />
            </div>
        </>
    )
  }