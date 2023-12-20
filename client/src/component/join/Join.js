import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

let Loginuser = "";
export default function Join() {
    const navigate = useNavigate();
    const [user,setuser]=useState("");
    const inputHandler = (e) => {
        e.preventDefault();
        Loginuser=user;
        console.log("user==>",user);
        navigate("/chat");
    }
    return (
        <div>
            <div className="container mt-5">
                <div className='container d-flex' style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h2 style={{ borderBottom: "2px solid white", width: "30%" }}>C CHAT</h2>

                    <input type="text" className='bg-white text-dark fs-4 fw-bold mt-3' id="formGroupExampleInput" onChange={(e)=>setuser(e.target.value)} placeholder='enter your name' style={{ width: "30%", height: "5vh" }} />
                    <br></br>
                   
                    <button className='btn bg-danger' onClick={inputHandler}  style={{ width: "30%" }}>Login</button>
                </div>

            </div>
        </div>
    )
}

export { Loginuser };
