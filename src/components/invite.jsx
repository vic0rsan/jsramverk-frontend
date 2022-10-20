import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../models/auth";

export default function Invite() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleRegister() {
        await auth.register({email, password});
        navigate("/");
    }

    return(
        <>
            <div style={{textAlign: "center", fontSize: '20px'}} >
                <p>You have been invited to edit a document!</p>
                <p>Fill in the form below with the email you recieved the invite from</p>
            </div>

            <div 
                style={{backgroundColor: "lightblue", padding: "2.5em", width: "500px", margin: "auto", textAlign: "center", fontSize: "25px"}}
                >
                    <h1 style={{fontSize: "30px"}}>Register</h1>
                
                <div>
                    <label htmlFor="email">Email:</label>
                    <br/>
                    <input
                        onChange={(e) => setEmail(e.target.value)} 
                        style={{fontSize: "20px"}} type="text" id="email" name="email"
                    />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <br/>
                    <input
                        onChange={(e) => setPassword(e.target.value)}  
                        style={{fontSize: "20px"}} type="password" id="password" name="password"
                        />
                </div>

                <div style={{marginTop: "1em"}}>
                    <button onClick={handleRegister} style={{fontSize: "20px"}}>Register</button>
                </div>
            </div>
        </>
    );
}