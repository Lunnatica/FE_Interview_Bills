import React from 'react'
import welcomeIcon from '.././assets/welcome.jpg';


function NavBar(props) {
    return (
        <>
            <div id="topBar">
                <img src={welcomeIcon} alt="Welcome!"/>
                <h1>CleoP</h1>
            </div>
            <button id="showBills" onClick={() => props.callback("Bills")}>Bills</button>
            <button id="showPotentialBills" onClick={() => props.callback("PotentialBills")}>Potential bills</button> 
        </>
    )
}

export default NavBar