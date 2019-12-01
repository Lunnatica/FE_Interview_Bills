import React from "react"
import Transaction from "./Transaction"

function TransactionTable(props) {
    return (
        <table className="transactionsTable">
            <tbody>
                {props.transactions.map(item => 
                    <Transaction key={item.id}
                    amount={item.amount}
                    date={item.date} />
                    )
                } 
            </tbody>      
        </table>
    )
}

export default TransactionTable