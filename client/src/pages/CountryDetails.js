import { LoadingContext } from "../context/loading.context"

import { useContext, useEffect } from "react"

import { useParams, useNavigate } from "react-router-dom"

import { post } from "../services/authService"

const CountryDetails = () => {

    const { country, findCountry, user, setUser } = useContext(LoadingContext)

    const { id } = useParams()

    const navigate = useNavigate()

    const getPhoto = (code) => {
    
        return `https://flagpedia.net/data/flags/icon/72x54/${code.toLowerCase()}.png`
    }

    const addCountry = (thisCountry) => {
        let addedCountry = {
            name: thisCountry.name.common,
            capital: thisCountry.capital[0],
            alpha2Code: thisCountry.alpha2Code,
            flag: getPhoto(thisCountry.alpha2Code),
            region: thisCountry.region,
            languages: Object.values(thisCountry.languages),
            currency: Object.values(thisCountry.currencies)

        }

        console.log("Added Country", addedCountry)

        post(`/countries/add-country/${user._id}`, addedCountry)
            .then((results) => {
                console.log(results.data)
                setUser(results.data)
                navigate('/new-post')
            })
            .catch((err) => {
                console.log("line 40")
                console.log(err)
            })

    }

    useEffect(() => {


        if (!country) {
            findCountry(id)
        }

    }, [])

    return (

        <div className="country">

        {

            country ? 
            
                <>
                    <img src={getPhoto(country.alpha2Code.toLowerCase())}  alt='country' />     
                    <h1>{country.name.common}</h1>
                    <table className="table">
                        <tbody>
                            <tr>
                            <td style={{width: '30%'}}>Capital</td>
                            <td>{country.capital[0]}</td>
                            </tr>
                            <tr>
                            <td>Area</td>
                            <td>
                                {country.area} km
                                <sup>2</sup>
                            </td>
                            </tr>
                            <tr><td>Region: {country.region}</td></tr>

                            <tr><td>Languages:</td></tr>

                            {Object.values(country.languages).length ? 
                            
                                Object.values(country.languages).map((language) => {
                                    return (
                                        <tr key={language}>
                                            <td>{language}</td>
                                        </tr>
                                    )
                                })
                            
                                : <p>No official langauges</p>

                            }
                            <tr>
                            <td>Currencies:</td>
                            </tr>

                            {Object.values(country.currencies).length ? 
                            
                                Object.values(country.currencies).map((currency) => {
                                    return (
                                        <tr key={currency.name}>
                                            <td>{currency.name}</td>
                                        </tr>
                                    )
                                })
                            
                                : <p>No official currencies</p>

                            }

                        </tbody>
                    </table>
                    
                    {
                        user ?

                        <button onClick={()=>addCountry(country)}>Add trip</button>

                        :

                        <p>Signup or Login to add trip</p>
                    }


                </>


            : <h4>Loading...</h4>

        }

                </div>
    )
}

export default CountryDetails