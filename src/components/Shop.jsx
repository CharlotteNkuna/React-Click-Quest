import React from "react";

export default function Shop({coins,upgradeCost, onUpgrade}){
    const canUpgrade = coins >= upgradeCost;

    return(
        <>
        <div className="d-flex flex-column align-items-center mb-4">
            <button onClick={onUpgrade}
             disabled={!canUpgrade }
             className={`btn ${canUpgrade? 'btn-success' : 'btn-secondary'} btn-md md-2`}
             >
                Upgrade ⬆️ (Cost: {upgradeCost})</button>

                {!canUpgrade && <small className="text-light">
                    Need{upgradeCost - coins} more coins!</small>}
        </div>
        </>
    )
}