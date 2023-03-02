import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { LoadingContext } from '../context/loading.context'

const PostDetails = () => {

    const { user, post, getPost } = useContext(LoadingContext)

    const { id } = useParams()

    const checkOwner = (postOwner, userId) => {
        return (postOwner === userId)
    }


    useEffect(() => {
        if (!post) {
            getPost(id)
        }
    }, [])


  return (


    <div>
        <h1>PostDetails</h1>


        {
            post ?

            <div>

                <h2>{post.title}</h2>

                    { 

                        user &&

                        

                        (checkOwner(post.contributor._id, user._id)) && <button>Edit Post</button>

                    }

            </div>

    

            : <h4>Loading...</h4>
        }

    
    
    </div>


  )
}

export default PostDetails