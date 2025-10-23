import React from "react";

export default function Footer({onReset}){
    return(
        <>
        <footer className="mt-4 text-center">

            <button className="btn btn-danger bt-sm" onClick={onReset}>Reset 🔁</button>
            <p className="mt-2 text-muted" style={{fontSize: '0.8rem'}}>Made by Thembeka © with React Bootstrap </p>
        </footer>
        </>
    )

}