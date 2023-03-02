import { useContext, useState } from "react"
import { LoadingContext } from "../context/loading.context"

const NewPost = () => {

    const { user } = useContext(LoadingContext)

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
        console.log(newPost)
    }

    return (
        <div>
            <h1>New Post</h1>

            {
                user ? 
                    <form>

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

                    </form>

                : <h4>Loading...</h4>
            }

        </div>
    )
}

export default NewPost