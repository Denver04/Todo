import { useState } from 'react'
import './App.css'
import List from './List';
import Header from './Header';
import { color } from '@mui/system';

function App() {

  // const concernedElement = document.querySelector(".click-text");

  // document.addEventListener("mousedown", (event) => {
  //   if (concernedElement.contains(event.target)) {
  // //     // console.log("Clicked Inside");
  //     setOpen(false);
  // //     // setOpenName("+");
  //   } 
    // else {
  //     // console.log("Clicked Outside / Elsewhere");
  //     setOpen(false);
  //   }
  // });

  const [input , setInput] = useState({
    title:"",
    content:"",
    date:""
  });
  const [todo , setTodo] = useState([]);
  const [expand , setexpand] = useState(false);
  const [openName , setOpenName] = useState("+");
  // const msg = "You don't have any to-do";
  // const [message , setMessage] = useState(msg);

  const n = todo.length;

  const handleChange = (event) => {
    event.preventDefault();
    // setInput(event.target.value);
    const {name , value} = event.target;
    setInput({
      ...input,
      [name]: value,
    });
  }

  const handleClick = () => {
    if(input.title=="" || input.content=="" || input.date==""){
      alert("Fill all the fields")
    }
    else if(input.content.length < 50){
      alert("Minimum 50 words need to be written")
    }
    else{
      console.log(n);
      setTodo((todos)=>{
        return [...todos , input]
      })
      setInput({
        title:"",
        content:"",
        date:""
      });
    }
  }

  const handleExpand = () => {
    setexpand(prev => !prev);
    {
      if(!expand){
        setOpenName("Add");
      }
      else{
        setOpenName("+");
      }
    }
  }

  const handleComp = () => {
    setexpand(false);
    setOpenName("+");
  }

  const deleteTodo = (id) => {
    setTodo((prev)=>{
      return prev.filter((todo , index)=>{
        return index !== id;
      })
    })
  }
  return (
    <div className="App">
      <div className='header'>
        <Header />
      </div>
      <div className='head'>
      <div className='container'>
      {expand ? (
        <>
          <input placeholder='Title' className='title' value={input.title} name="title" type="text" onChange={handleChange} required/>
          <textarea placeholder='description of todo' className='content' value={input.content} name="content" type="text" onChange={handleChange} maxLength="100" rows="2" cols="1" required/>
          <label>
            <span>Due Date :</span> 
            <input type="month" value={input.date} name="date" onChange={handleChange} required/>
          </label>
          <div className='btn'>
            <button onClick={handleClick}>Add</button>
            <button className="click-text" onClick={handleComp} style={{backgroundColor: "red" , border:"none"}}>Cancel</button>
          </div>
        </> ): 
        <div className='add-top'>
          <div className='adding'>
            <h2>Add a New To-Do to your List</h2>
            <button onClick={handleExpand} className="click-text" style={{backgroundColor:"green"}}>{openName}</button>
          </div>
        </div>
      }   
        {/* <input placeholder='Title' value={input.title} name="title" type="text" onChange={handleChange} required/>
        <input placeholder='Add a todo' value={input.content} name="content" type="text" onChange={handleChange} required/>
        <input type="datetime-local" value={input.date} name="date" onChange={handleChange} required/> */}
        {/* <button onClick={handleExpand} className="click-text">{openName}</button> */}
      </div>
      <div className='msg'>
            <h3>Currently , you have {n} todo in your list</h3>
        </div>
      </div>
      <div className='all-cards'>
        { todo.map((todos , index) => {
          return <List content={todos.content} date={todos.date} title={todos.title} key={index} id={index} onDelete={deleteTodo}/>
        }) }
      </div>
      
    </div>
  )
}

export default App
