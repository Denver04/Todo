import React from 'react';

const List = (props) => {
    return (
        <>
            <div className='card'>
                <button onClick={()=>{props.onDelete(props.id)}}>X</button>
                <h4 className='title'> {props.title} </h4>
                <p className='content'> {props.content} </p>
                <p className='date'> {props.date} </p>
            </div>
            
        </>
    )
};

export default List;