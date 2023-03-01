import { LoadingContext } from "../context/loading.context"

import { useContext, useEffect } from "react"

import { useParams } from "react-router-dom"

const CountryDetails = () => {

    const { country, findCountry } = useContext(LoadingContext)

    const { id } = useParams()

    // const findCountry = (code) => {
    //     return countries.find((country) => country.alpha2Code === code)
    // }

    
    const getPhoto = (code) => {
    
        return `https://flagpedia.net/data/flags/icon/72x54/${code.toLowerCase()}.png`
    }


    useEffect(() => {


        if (!country) {
            findCountry(id)
        }

    }, [])

    return (

        <div className="col-7">

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

                        </tbody>
                    </table>

                </>


            : <h4>Loading...</h4>

        }

                </div>
    )
}

export default CountryDetails