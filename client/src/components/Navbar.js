import { Link } from "react-router-dom"
import { useContext } from "react"
import { LoadingContext } from "../context/loading.context"

const Navbar = () => {

    let token = localStorage.getItem('authToken')

    const { user } = useContext(LoadingContext)

    return (
        <nav>

            <Link to={'/'}>Home</Link>
            <Link to={'/countries'}>Countries</Link>
            <Link to={'/posts'}>Posts</Link>

            {
                token ? 
                <>
                    <Link to={`/profile/${user._id}`}>Profile</Link>
                    <Link to={'/new-post'}>New Post</Link>
                </>

                : 

                <>
                    <Link to={'/signup'}>Signup</Link>
                    <Link to={'/login'}>Login</Link>
                </>
            }

        </nav>
    )
}

export default Navbar