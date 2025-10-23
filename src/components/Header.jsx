import React from "react";

export default function Header({coins, coinsPerClick}){
    return(
    <>
    <header className="text-center-mb-4">
        <h1 className="display-4">🎮 Click Quest Game</h1>
        <p className="lead">Coins:{coins} | coins per click :{ coinsPerClick}</p>
    </header>

    </>
    )
}
