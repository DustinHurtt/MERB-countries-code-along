import { useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { get, post } from "../services/authService";

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');

    const [ countries, setCountries ] = useState([]);
    const [ country, setCountry ] = useState(null);

    const [ posts, setPosts ] = useState([])
    const [ post, setPost ] = useState(null)

    const setTimedMessage = (newMessage) => {
      setMessage(newMessage);
      setTimeout(() => {
        setMessage('')
      }, 4000)
    }

    return (
        <LoadingContext.Provider value={{ countries, country, posts, post, isLoading, message, user, setPost, setPosts, setCountries, setCountry, setIsLoading, setMessage, setUser, setTimedMessage }}>
          {children}
        </LoadingContext.Provider>
      );
}

export { LoadingContext, LoadingProvider }