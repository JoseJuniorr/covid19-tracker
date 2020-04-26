import React from 'react'

import { Cards, Chart, CountryPicker } from './components'

import { fetchData } from './services/api'

import covid19Img from '../src/assets/img/covid19-logo.png'
import styles from './App.module.css'

class App extends React.Component {

    state = {
        data: {},
        country: '',
    }

    async componentDidMount() {
        const fecthedData = await fetchData()

        this.setState({ data: fecthedData })
        // console.log(fecthedData)
    }

    handleCountryChange = async (country) => {
        //fetch the data
        const fetchedData = await fetchData(country)
        //console.log(fetchedData)

        //set the state
        this.setState({ data: fetchedData, country: country })



    }


    render() {

        const { data, country } = this.state

        return (
            <div className={styles.container}>
                <img className={styles.image} src={covid19Img} alt="Covid 19 Logo" />
                <Cards
                    data={data}
                    country={country}
                />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart data={data} country={country} />


            </div>




        )
    }

}


export default App