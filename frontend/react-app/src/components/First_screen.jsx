import React, { useState } from 'react'
import { Login } from './Login'
import { Signup } from './Signup'

export const First_screen = () => {
    const [activeForm, setActiveForm] = useState("Login");
    console.log(activeForm);
  return (
    <div>
        <div>
        <button onClick={()=>setActiveForm("Login")}>Login</button>
        <button onClick={()=>setActiveForm("Signup")}>Signup</button>
        </div>

        <div>
            {activeForm==="Login" && <Login/>}
            {activeForm==="Signup" && <Signup/>}
        </div>

    </div>
  )
}
