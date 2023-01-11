import React from 'react';
import "./App.css"
import DeleteIcon from '@mui/icons-material/Delete';

const List = (props) => {
    return (
        <div className='cards'>
            <div className='card'>
                <h4 className='title'> {props.title} </h4>
                <p className='content'> {props.content} </p>
                <p className='date'> <strong style={{color:"#f36161"}}>Due Day : </strong> {props.date} </p>
                <button className='deletebtn' onClick={()=>{props.onDelete(props.id)}}><DeleteIcon style={{position:"relative" , top:"4px"}} /></button>
            </div>
            
        </div>
    )
};

export default List;