import React from 'react'
import "./Message.css"
export default function Message({message,user,classs}) {
    if(user){
        return (
            <div className={`messageBox ${classs}`}>
                {`${user}:${message}`}
            </div>
        )
    }
    else{

        return (
            <div className={`messageBox ${classs}`}>
                {`you :${message}`}
            </div>
        )
    }
}
