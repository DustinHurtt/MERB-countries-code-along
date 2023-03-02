import { useContext, useState } from "react"

import { useNavigate } from "react-router-dom"

import { LoadingContext } from "../context/loading.context"

import { post } from "../services/authService"


const NewPost = () => {

    const { user, posts, setUser, setPosts } = useContext(LoadingContext)

    const navigate = useNavigate()

    const [ newPost, setNewPost ] = useState(
        {
            title: '',
            story: '',
            date: '',
            contributor: "" || user?._id,
            country: '',
            photo: ''

        }
    )

    const handleChange = (e) => {
        setNewPost((recent) => ({...recent, [e.target.name]: e.target.value}))
        console.log("NEW POST", newPost)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        post(`/posts/create-post/${user._id}`, newPost)
            .then((results) => {

                let newPosts = [...posts]
                newPosts.unshift(results.data)
                setPosts(newPosts)

                let newUser = Object.assign({}, user)
                newUser.posts.push(results.data)
                setUser(newUser)

                console.log(results.data)

                navigate('/posts')

            })
            .catch((err) => {
                console.log(err)
            })

    }

    return (
        <div>
            <h1>New Post</h1>

            {
                user ? 
                    <form onSubmit={handleSubmit}>

                        <label>Country</label>
                        <select name="country" value={newPost.country} onChange={handleChange}>
                         <option>Choose Country</option>

                        {user.countries_visited.map((country) => {
                            return <option key={country.name} value={country._id} 
                            >{country.name}</option>
                        })}

                        </select>


                        <label>Title</label>
                        <input type='text' name="title" value={newPost.title} onChange={handleChange} />

                        <label>Story</label>
                        <textarea name="story" value={newPost.story} onChange={handleChange} />

                        <label>Date</label>
                        <input type='date' name='date' value={newPost.date} onChange={handleChange}/>

                        <label>Photo</label>
                        <input type='string' name='photo' value={newPost.photo} onChange={handleChange}/>

                        <button type="submit">Create Post</button>

                    </form>

                : <h4>Loading...</h4>
            }

        </div>
    )
}

export default NewPost