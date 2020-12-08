import React from 'react'

export default (props) => {
    return (
        <li>
            <input type     = "checkbox" 
                   onClick  = {props.handleCheck}
                   checked  = {props.isChecked}
                   value    = {props.value}
            />
            {props.value}
        </li>
    )
}