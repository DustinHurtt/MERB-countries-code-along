import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { get, post } from "../services/authService";
import axios from "axios";

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');

    const [ countries, setCountries ] = useState(null);
    const [ country, setCountry ] = useState(null);

    const [ posts, setPosts ] = useState([])
    const [ post, setPost ] = useState(null)

    const setTimedMessage = (newMessage) => {
      setMessage(newMessage);
      setTimeout(() => {
        setMessage('')
      }, 4000)
    }

    const getCountries = () => {
      axios.get('https://ih-countries-api.herokuapp.com/countries')
      .then((response) => {
        setCountries(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
    }

    const findCountry = (code) => {
      let thisCountry = countries.find((country) => country.alpha2Code === code)
      setCountry(thisCountry)
  }

    return (
        <LoadingContext.Provider value={{ countries, country, posts, post, isLoading, message, setUser, user, setPost, setPosts, setCountries, setCountry, setIsLoading, setMessage, setTimedMessage, getCountries, findCountry }}>
          {children}
        </LoadingContext.Provider>
      );
}

export { LoadingContext, LoadingProvider }