import React from "react"
import Bill from "./Bill"

function Tab(props) {
    return (
        props.data.length > 0 ?
            (<div className="billsList">
                {props.data.map(item => {
                        const category = props.categories.filter(category => category.id === item.categoryId)
                        return (
                            <Bill key={item.id} 
                            category={category}
                            removeBillCallback={props.removeBillCallback}
                            addAsBillCallback={props.addAsBillCallback}
                            {...item}
                            />
                        )
                    })
                }
            </div>) :
            <h1>💵 There are no bills! 💵</h1>
    )
}

export default Tab