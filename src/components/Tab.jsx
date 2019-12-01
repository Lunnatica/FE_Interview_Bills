import React from "react"
import Bill from "./Bill"

function Tab(props) {
    return (
        <div className="billsList">
            {props.data.map(item => {
                    const category = props.categories.filter(category => category.id === item.categoryId)
                    return (
                        <Bill key={item.id} 
                        iconUrl={item.iconUrl}
                        category={category}
                        name={item.name}
                        transactions={item.transactions} 
                        />
                    )
                
            }
            )
            }
        </div>
    )
}

export default Tab