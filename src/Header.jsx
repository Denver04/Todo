import React from 'react';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { fontSize } from '@mui/system';

function Header() {
  return (
    <div className='h1'>
        <ListAltIcon fontSize='large'/>
        <h1>To-Do List</h1>
    </div>
  )
}

export default Header