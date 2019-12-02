import React from "react"
import dayjs from "dayjs"


function Transaction(props) {
  

    return (
        <tr id={props.id} className="transactionRow">
            <td className="transactionDate">{dayjs(props.date).format('D-MM-YY')}</td>
            <td className="transactionAmount">£{props.amount}</td>
        </tr>
    )
}


export default Transaction