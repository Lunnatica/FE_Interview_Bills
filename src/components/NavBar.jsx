import React from 'react'
import welcomeIcon from '.././assets/welcome.jpg';


function NavBar(props) {
    const billsClassName = props.currentTab === "Bills" ? "navigationButtonActive" : "navigationButtonDisactive"
    const potentialBillsClassName = props.currentTab === "PotentialBills" ? "navigationButtonActive" : "navigationButtonDisactive"

    return (
        <>
            <div id="topBar">
                    <img src={welcomeIcon} alt="Welcome!"/>
                    <h1>CleoP</h1>
                </div>
            <div id="navigation">
                <button className={billsClassName} onClick={() => props.callback("Bills")}>Bills</button>
                <button className={potentialBillsClassName} onClick={() => props.callback("PotentialBills")}>Potential bills</button> 
            </div>
        </>
    )
}

export default NavBar


