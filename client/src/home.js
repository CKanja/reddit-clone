import React, { useEffect, useState } from 'react'
// import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import './home.css'
// import { request } from '../../Server/routes/routes'

const Home = () => {

    const navigate = useNavigate()
    async function getPosts() {
    const getdata = await fetch('http://localhost:5000/api/v1/posts', {
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

    const response = await fetch('http://localhost:5000/api/v1/add_post', {
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

//   state = {
//       posts:[]
//   };
const[posts, setPosts] = useState([]);

// start
// useEffect(() => {
//         const url = "http://localhost:5000/api/v1/posts";

//         const fetchData = async () => {
//             try {
//                 const response = await fetch(url);
//                 const json = await response.json();
//                 console.log(json.slip.advice);
//                 setPosts(json.slip.advice);
//             } catch (error) {
//                 console.log("error", error);
//             }
//         };

//         fetchData();
//     }, []);

// stop

// trial
//   const fetchPost = async() => {
//     try{
//       const res = await axios.get("http://localhost:5000/api/v1/posts");
//       const data = response.data;
//       console.log(data)
//     } catch (error){
//       console.log(error);
//     }
 
// }

// useEffect(() => {
//  fetchPost()
// }, []);
// trial

// trial2
  useEffect(() => {
    axios.get("/api/v1/posts")
    .then(res => {
      console.log(res)
      setPosts(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])
 

// trial2

//   getAllPosts = () => {
//         axios.get('http://localhost:5000/api/v1/posts')
//         .then((response) => {
//             const data = response.data;
//             this.setState({ posts: data})
//             console.log("Data received!")
//         })
//         .catch(() => {
//             alert("Data not received")
//         })
//   }

// const Addupvotes = async(id, newCount) => {
//   try {
//     const response = await axios.put(`http://localhost:5000/api/v1/posts/${id}/upvotes`,{upvotes:newCount});
//   } catch (error) {
//     console.log(error);
//   }
// };

// styles
// const stylesForm = {
//     backgroundColor: 'lightblue',
//     marginTop: '5%',
//     width: '40%',
//     height: '400px',
//     marginLeft: '25%',
//     marginRight: '25%',
//     borderRadius: '20px',
//     padding: '1px 50px'
//       };

// const formInput = {
//     marginTop: '30px',
//     height: '35px',
//     width: '50%',
//     marginLeft: '2%',
//     borderRadius: '10px',
//     border: 'none',
//     textAlign: 'center',
//     fontSize: '18px',
//     padding: '5px 30px',
// }

// const submitbtn = {
//   backgroundColor: '#f8f8f8',
    
//   width: '20%'
// }

    return (
    <div>
    <h2> HELLO! Welcome!! </h2>
    <div>
        <h1>Add Post</h1>
        <form  onSubmit={addPost}>
          <input  class="form-group"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text" 
            placeholder="Post Title"       
          /> 
          <br>
          </br>

          <input class="form-group"
            value={content}
            onChange={(e) => setDescription(e.target.value)}
            type="text" 
            placeholder="Content"       
          />
            <br>
          </br>

          <input class="form-group"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            type="text" 
            placeholder="Category"       
          />
          <br/>
          <input  type="Submit" value="Post"/>
          <br/>
         
        </form>
         <div >
           
             {
               posts.map(post => <div style={{"backgroundColor": "#a9d6e5", "width": 800, "margin": "auto"}} key={post._id}><h1>{post.title}</h1><p>Posted at: {post.dateTime}</p><p>{post.content}</p><p>Votes: {post.upvotes-post.downvotes}</p><p style={{"backgroundColor": "white", "width": 400, "margin": "auto"}}>Category: {post.category}</p><p>comments: {post.comments.map((comment) => (<div><p style={{"backgroundColor": "white", "width": 400, "margin": "auto"}}>{comment.content}</p></div>))}</p> <button type="button"> Read Comments </button><button type="button"> Upvote </button><button type="button"> Downvote </button></div> )
             }
           
             {/* {post.comments.map(comment => <div>{post.comments[0].content}</div>)} */}
             {/* onClick={() => Addupvotes(post._id,post.upvotes+1)} */}

         </div>
      </div>
      
    </div>
   
    
    )
}

export default Home;