import React, { useState } from "react"
import TransactionsTable from "./TransactionsTable"


function Bill(props) {
    const [visibility, setVisibility] = useState(false)
    const totalMoneyTransactions = props.transactions.reduce((acc,item) => acc + item.amount,0)
    const transactionsButtonText =  `Show ${props.transactions.length} transactions (Total: £${totalMoneyTransactions})`
    return (
            <div className="billDiv" id={props.id}>
                <div className="billHeader">
                    {props.iconUrl ? 
                        <img className="billIcon" src={props.iconUrl} alt={props.name + " logo"}/> : 
                        null
                    }
                    <h1>{props.name} </h1>
                    {props.isBill ? 
                        <button className="removeBillButton" onClick={() => props.removeBillCallback(props.id)}>Remove bill</button> : 
                        <button className="addAsBillButton" onClick={() => props.addAsBillCallback(props.id)}>Add as bill</button>
                    }
                </div>
                <div className="transactionsArea">
                    <button className="showTransactionsButton" onClick={() => setVisibility(!visibility)}>
                        {transactionsButtonText}<img className="categoryIcon" src={props.category[0].iconUrl} alt={props.category[0].name}/>
                    </button>
                    {visibility ? <TransactionsTable  transactions = {props.transactions}/> : null}
                </div>
            </div>  
    )
}

export default Bill