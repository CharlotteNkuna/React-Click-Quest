import React from "react";
import { useState } from "react";

export default function GameArea({onClick, isEvasive, teleport}){
const [position,setPosition]= useState({top:'50%', left: '50'}) //to be positioned
const [visible, setVisible] = useState(true); //to see our sprite- gamming cartoons

//set position- beginning point of our sprite
//this part is to make smooth position and moving of the sprite
const getRandomPosition =()=>{ // must be everywhere between top and left
    const top = Math. floor(Math.random()* 70) + 10;
    const left = Math. floor(Math.random()* 70)+ 10

    return {top: `${top}%`, left: `${left}`}
};


const handleClick=()=>{
if( !visible) return;// if something is ! not visible, return to onclick- onclick will make it visible
 //calling our sprite back to screen
onClick()
if (teleport){
    setVisible(false); //teleportmode means the button must disappear

    const delay =Math.random() * 1000 + 500; //delay time

    setTimeout(()=>{
    setPosition(getRandomPosition())
    setVisible(true);
},
delay)
} else{
    setPosition(getRandomPosition())
}
}//end of function
//Track the distance of the mouse on hover 
const handleHover= ()=> {
    if (isEvasive && visible)
        setPosition(getRandomPosition)
}
    return(
        <>
        <div className="position-relative -100" style={{height: '60vh'}}>
            {visible && (
                <button onClick={handleClick}
                onMouseEnter={handleHover}
                style={{
                    position: 'absolute',
                    top: position.top,
                    left: position.left,
                    transform:'translate(-50%, -50%)', //
                    transition: 'top 0.3s ease, left 0.3s ease'
                }}
                className= {`btn ${isEvasive ? 'btn-danger' : 'btn-warning'}`} //conditional statement, on the left is false : right true
                >Click Me😜</button>

            )}

        </div>
        </>
    )
}
