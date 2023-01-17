import { useState , useEffect } from 'react'
import './App.css'
import List from './List';
import Header from './Header';
import useLocalStorage from "use-local-storage";
// import { color } from '@mui/system';
// import AddIcon from '@mui/icons-material/Add';

function App() {

  // const concernedElement = document.querySelector(".click-text");

  // const s = 0;
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

  const [theme , setTheme] = useLocalStorage("theme" ? "dark" : "light");
  
  const switchtheme = () =>{
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }
  const initial = JSON.parse(localStorage.getItem("todo")) || [];
  const [input , setInput] = useState({
    title:"",
    content:"",
    date:""
  });
  const [todo , setTodo] = useState(initial);
  const [expand , setexpand] = useState(false);
  const [openName , setOpenName] = useState("+");

  // const msg = "You don't have any to-do";
  // const [message , setMessage] = useState(msg);

  useEffect(()=>{
    localStorage.setItem("todo" , JSON.stringify(todo));
  } , [todo]);

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
    else if(input.content.length < 10){
      alert("Minimum 10 words need to be written")
    }
    else if(input.title.length > 20){
      alert("Title length should not be more than 20 words")
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
    alert("To-Do has been deleted");
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
          <textarea placeholder='Description of todo' className='content' value={input.content} name="content" type="text" onChange={handleChange} maxLength="50" rows="1" cols="1" required/>
          <div className='dates'>
            <span>Due Date :</span> 
            <input type="date" value={input.date} name="date" onChange={handleChange} required/>
          </div>
          <div className='btn'>
            <button onClick={handleClick} className="add" data-back="Add" data-front="Add it"></button>
            <button className="click-text" onClick={handleComp} style={{color:"red",border:"none" , width:"42%"}}>Cancel</button>
          </div>
        </> ): 
        <div className='add-top'>
          <div className='adding'>
            <h2>Add a New To-Do to your List</h2>
            <button onClick={handleExpand} className="click-text" style={{backgroundColor:"green" , padding:"1px 15px" , color:"black" , fontWeight:"bolder" , fontSize:"32px"}}>{openName}</button>
          </div>
        </div>
      }   
        {/* <input placeholder='Title' value={input.title} name="title" type="text" onChange={handleChange} required/>
        <input placeholder='Add a todo' value={input.content} name="content" type="text" onChange={handleChange} required/>
        <input type="datetime-local" value={input.date} name="date" onChange={handleChange} required/> */}
        {/* <button onClick={handleExpand} className="click-text">{openName}</button> */}
      </div>
      <div className='msg'>
            <h3>Currently , you have <span style={{color:"blue"}}>{n}</span> todo in your list</h3>
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
