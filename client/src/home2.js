import React, { useEffect, useState } from 'react'
// import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
// import { request } from '../../Server/routes/routes'
import './home.css'
import axios from 'axios'
import logo from './logo.svg';



const Home2 = () => {

    const navigate = useNavigate()
    async function getPosts() {
    const getdata = await fetch('/api/v1/posts', {
        headers: {
            'x-access-token': localStorage.getItem('token'),
        },
    })

    // const data = await request.json()
    console.log(getdata)
    }


    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            // const user = jwt.decode(token)
            const user = jwtDecode(token)
            console.log(user)
            if (!user) {
                localStorage.removeItem('token')
                // window.location.href = '/'
                navigate.replace('/login')
            } else {
                getPosts()
            }
        }
    }, [])

  const [title, setTitle] = useState('')
	const [content, setDescription] = useState('')
	const [category, setCategory] = useState('')
  
  async function addPost(event) {
    event.preventDefault()

    const response = await fetch('/api/v1/add_post', {
    method:'POST',
headers: {
  'Content-Type': 'application/json',
},
    body: JSON.stringify({
      title,
      content,
      category,
    }),
     
  })

  const data = await response.json()

  // if (data.status === 'ok') {
	// 		history.push('/login')
     
	// 	}

  console.log(data)
  }

  const[posts, setPosts] = useState([]);

//   get posts
  useEffect(() => {
    axios.get("http://localhost:5000/api/v1/posts")
    .then(res => {
      console.log(res)
      setPosts(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  // const contentStyle = {
  //   width: "60%",
  //   alignitems: "center",
  //   lineheight: "30em"

  // };

  // const inputStyle={
  //   margin: "50",
  //   width: "30%"
    

  // }


  // const formStyle ={

  //   margin: "5% , 25% , 20% , 10%",
  //   marginright: "25%",
  //   borderradius: "3px",
  //   backgroundColor: "lightBlue",
  //   margin: "auto",
  //   width: "600px",
  //   padding: "10px 100px"


  // }

  // const buttonStyle={
  //   marginleft: "75px",
  //   marginbottom: "98px",
  //   border: "none",
  //   borderradius: "50px",
  //   padding: "6px 20px",
  //   backgroundcolor: "#fff",
  //   color: "#000",
    


  // }
  
  // const titleStyle={
  //   // padding: "50px 15px",
  //   // margin: "auto",
  //   width: "50%",
  //   // border: "3px solid green",
  //   padding: "20px 100px"

  // }

  // const formPosition = {
  //   // padding: "50px"
  //   // margin: "auto",
  //   // width: "50%",
  //   // border: "3px solid green",
  //   // padding: "10px"
  // }

    return (
    <div className="App">
        
          <header className="App-header">
             
          <br/>
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Welcome to Reddit.
            </p>
            
          </header>



    <div
    //  style={formStyle}
     >
    {/* <h2 style={mystyle}> HELLO! Welcome!! </h2> */}
    <div>
        {/* <h1 class="generalContent"
        // style={titleStyle}
        >THIS IS THE PAGE TO ADD POSTS</h1> */}
        <form 
        // style={formPosition}
        
        onSubmit={addPost}>

<h4 class="title-form">FILL OUT THIS FORM TO POST</h4>
          <textarea 
          cols="60"
          rows="2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text" 
            placeholder="Post Title"       
          /> 
          <br>
          </br>
          <br>
          </br>
          <textarea 
          // name=''
          // id=''
          cols="60"
          rows= "7"

          // style={contentStyle}
          class="form-group"
          value={content}
          onChange={(e) => setDescription(e.target.value)}
          type="text" 
          placeholder="Add Content"       
          />
            <br>
          </br>
          <br>
          </br>
          <select class="form-group" name="category" id="category" value={category} 
          
          // style={inputStyle}
            onChange={(e) => setCategory(e.target.value)}>
              
          <option value="Choose">Choose category</option>
          <option value="tech">Tech</option>
          <option value="Sports">Sports</option>
          <option value="Education">Education</option>
          <option value="Health">Health</option>
          <option value="Climate">Climate</option>
          </select>

          {/* <input class="form-group"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            type="text" 
            placeholder="Category"       
          /> */}

          <br>
          </br>
          <br/>
          <button 
          // style={buttonStyle} 
          type="Submit"> POST </button>
          <br/>
          <br>
          </br>
         
        </form>
       

        <div >
           
             {
               posts.reverse().map(post => <div style={{"backgroundColor": "#a9d6e5", "width": 800, "margin": "auto"}} key={post._id}><h1>{post.title}</h1><p>Posted at: {post.dateTime}</p><p>{post.content}</p><p>Votes: {post.upvotes-post.downvotes}</p><p style={{"backgroundColor": "white", "width": 400, "margin": "auto"}}>Category: {post.category}</p><p>comments: {post.comments.map((comment) => (<div><p style={{"backgroundColor": "white", "width": 400, "margin": "auto"}}>{comment.content}</p></div>))}</p> <button type="button"> Read Comments </button><button type="button" onClick={() => <p>post.upvotes+1</p>}> Upvote </button><button type="button"> Downvote </button></div> )
             } </div>
        
      </div>
      
    </div>
   
    </div> 
    )
    
}

export default Home2;