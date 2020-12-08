import React from 'react'

export default (props) => {
    console.log(props);
    


    return (
        <div class="custom-select">
            <select onChange={(e)=>props.func(e)}>
                <option value={0}>{props.text}</option>
                {
                    props.state.map((val,index)=>{
                        return (
                            <option value={val.props.val0} key={index}>{val.props.val1}</option>
                        )
                    })
                }
            </select>
        </div>
    );
};