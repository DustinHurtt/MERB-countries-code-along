import { LoadingContext } from "../context/loading.context"

import { useContext, useEffect } from "react"

import { useParams } from "react-router-dom"

const CountryDetails = () => {

    const { country, findCountry } = useContext(LoadingContext)

    const { id } = useParams()

    const getPhoto = (code) => {
    
        return `https://flagpedia.net/data/flags/icon/72x54/${code.toLowerCase()}.png`
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

                </>


            : <h4>Loading...</h4>

        }

                </div>
    )
}

export default CountryDetails