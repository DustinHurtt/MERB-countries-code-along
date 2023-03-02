import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { LoadingContext } from '../context/loading.context'

const PostDetails = () => {

    const { post, getPost } = useContext(LoadingContext)

    const { id } = useParams()


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

            <h2>{post.title}</h2>

            : <h4>Loading...</h4>
        }
    
    
    
    </div>


  )
}

export default PostDetails