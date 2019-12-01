import React from "react"
import TransactionsTable from "./TransactionsTable"


function Bill(props) {
    
    return (
            <div class="billDiv" id={props.id}>
                <img className="billIcon" src={props.iconUrl} alt={props.name + " logo"}/>
                (<img className="categoryIcon" src={props.category[0].iconUrl} alt={props.category[0].name}/>)
                <h1>{props.name} </h1>
                <TransactionsTable transactions = {props.transactions}/>
            </div>  
    )
}


export default Bill