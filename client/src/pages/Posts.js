import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { LoadingContext } from "../context/loading.context"


const Posts = () => {

    const { posts, getPosts, setPost } =  useContext(LoadingContext)

    useEffect(() => {
        if (!posts.length) {
            getPosts()
        }
    }, [])

    return (
        <div className="all-posts">
            <h1>Posts</h1>


                
            {
                posts ? 
                <div>

                    {
                        posts.map((post) => {
                            return (
                                <Link onClick={()=>setPost(post)} to={`/post-details/${post._id}`}>
                                    <div key={post._id} className="post">
                                        <img src={post.photo} alt="post"/>
                                        <h3>{post.title}</h3>
                                        <p>{post.date}</p>
                                        <p>{post.country.name}</p>
                                    </div>
                                </Link>
                            )
                        })
                    }

                </div>
                :
                <h4>Loading...</h4>
            }

            

            {/* {user && console.log("user", user)}
            {posts && console.log("posts", posts)} */}

        </div>
    )
}

export default Posts