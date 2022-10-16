import React, { useState } from "react";
import auth from "../models/auth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {
        await auth.login({email, password});
    }

    async function handleRegister() {
        await auth.register({email, password});
    }

    return (
        <>
            <div 
                style={{backgroundColor: "lightblue", padding: "2.5em", width: "500px", margin: "auto", textAlign: "center", fontSize: "25px"}}
                >
                
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
                    <button onClick={handleLogin} style={{fontSize: "20px"}}>Log in</button>
                    <button onClick={handleRegister} style={{fontSize: "20px"}}>Register</button>
                </div>
            </div>
        </>
    );
}