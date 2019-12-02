import React, { useState } from "react"
import TransactionsTable from "./TransactionsTable"


function Bill(props) {
    const [visibility, setVisibility] = useState(false)
    return (
            <div className="billDiv" id={props.id}>
                <div className="billHeader">
                    {props.iconUrl ? 
                        <img className="billIcon" src={props.iconUrl} alt={props.name + " logo"}/> : 
                        null
                    }
                    <h1>{props.name} </h1>
                    (<img className="categoryIcon" src={props.category[0].iconUrl} alt={props.category[0].name}/>)
                    {props.isBill ? 
                        <button onClick={() => props.removeBillCallback(props.id)}>Remove bill</button> : 
                        <button onClick={() => props.addAsBillCallback(props.id)}>Add as bill</button>
                    }
                </div>
                <button onClick={() => setVisibility(!visibility)}>{`${props.transactions.length} transactions`}</button>
                {visibility ? <TransactionsTable className="transactionsTable" transactions = {props.transactions}/> : null}
            </div>  
    )
}

export default Bill