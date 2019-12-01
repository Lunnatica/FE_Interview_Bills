import React from 'react'

function NavBar(props) {
    return (
        <>
            <button id="showBills" onClick={() => props.callback("Bills")}>Bills</button>
            <button id="showPotentialBills" onClick={() => props.callback("PotentialBills")}>Potential bills</button> 
        </>
    )
}

export default NavBar