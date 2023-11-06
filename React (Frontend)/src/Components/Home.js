import React from 'react';
import '../Style/Home.css';
import axios  from 'axios';
import Welcome from './Welcome';
import QuickSearch from './QuickSearch';

class Home extends React.Component{

    constructor(){
        super();
        this.state = {
            locations: [],
            mealtype: []
        }
    }

    componentDidMount(){
        axios({
            url: 'http://localhost:5500/locations',
            method: 'GET',
            headers: { 'Content-Type': 'application/JSON' }
        })
        .then(res => {
            this.setState({ locations: res.data.locations })
        })
        .catch(err => console.log(err))

        axios({
            url: 'http://localhost:5500/mealtype',
            method: 'GET',
            headers: { 'Content-Type': 'application/JSON' }
        })
        .then(res => {
            this.setState({ mealtype: res.data.mealtype })
        })
        .catch(err => console.log(err))
    }
    
    

    render(){
        const { locations, mealtype } = this.state;

        return(
            <div>
                {/* Welcome (upper Part) */}
                <Welcome locationData = { locations } />

                {/* QuickSearch (bottom Part) */}
                <QuickSearch mealtypeData = { mealtype } />
            </div>
        )
    }

}

export default Home;