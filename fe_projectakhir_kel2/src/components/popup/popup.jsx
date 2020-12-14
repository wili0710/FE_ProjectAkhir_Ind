import zIndex from '@material-ui/core/styles/zIndex';
import React from 'react'

export default (props) => {
    
    return (
        <div className="popup">
            <section className="inner">
                <div className="inner_border">
                    <div className="head">
                        <h1 className="title">{props.title}</h1>
                        <button onClick={props.closepopup}>x</button>
                    </div>
                    <div className="content">
                        {props.content}
                    </div>
                </div>
            </section>
        </div>
    );
};

