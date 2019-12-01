import React from "react"

function Transaction(props) {
  

    return (
        <tr id={props.id} className="transactionRow">
            <td className="transactionDate">{props.date}</td>
            <td className="transactionAmount">{props.amount}</td>
        </tr>
    )
}


export default Transaction