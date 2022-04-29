import React, { useEffect, useState } from 'react'
// import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
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
    axios.get("http://localhost:5000/api/v1/posts")
    .then(res => {
      console.log(res)
      setPosts(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  })
 

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

    return (
    <div>
    <h2> HELLO! Welcome!! </h2>
    <div>
        <h1>Add Post</h1>
        <form onSubmit={addPost}>
          <input class="form-group"
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
          <input type="Submit" value="Post"/>
          <br/>
         
        </form>
         <div>
           <ul>
             {
               posts.map(post => <h1><li key={post._id}>{post.title}</li></h1>)
             }
           </ul>
         </div>
      </div>
      
    </div>
   
    
    )
}

export default Home;