import React from 'react';
import '../Style/Filter.css';
import queryString from "query-string";
import axios from "axios";
import navHook from "./nav";

class Filter extends React.Component{

    constructor() {
        super();
        this.state = {
            mealtype: [],
            restaurant: [],
            locations: [],          // fetch the list from DB
            location: undefined,       // send request through API
            cuisine: [],
            page: 1,
            sort: 1
            
        }
    }

    // Restaurant
    componentDidMount() {
        const q = queryString.parse(window.location.search);
        const { type } = q;
        //console.log(type);

        const filterObj = {
            mealtype: type
        }

        axios({
            url: 'http://localhost:5500/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/JSON' },
            data: filterObj
        })

            .then(res => {
                this.setState({ restaurant: res.data.restaurants, mealtype: type })
            })
            .catch(err => console.log(err))
        
        // locations data for the drop down
        axios({
            url: 'http://localhost:5500/locations',
            method: 'GET',
            headers: { 'Content-Type': 'application/JSON' }
        })
            .then(res => {
            this.setState({ locations: res.data.locations })
            })
            .catch(err => console.log(err))
    }

    // On Location Change
    handleLocationChange = (loc) => {
        const location = loc.target.value;

        const { mealtype } = this.state;

        const filterObj = {
            mealtype: mealtype,
            location: location
        }

        // filtering restaurant data as per location
        axios({
            url: 'http://localhost:5500/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/JSON' },
            data: filterObj
        })
            .then(res => {
            this.setState({ restaurant: res.data.restaurants, location })
            })
            .catch(err => console.log(err))

    }
    
    // pagination
    pagination = (page) => {
        const { mealtype, location, sort, cuisine } = this.state;

        const filterObj = {
            mealtype: mealtype,
            location: location,
            page,
            sort,
            cuisine: cuisine.length > 0 ? cuisine : undefined
        }

        axios({
            url: 'http://localhost:5500/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/JSON' },
            data: filterObj
        })
            .then(res => {
            this.setState({ restaurant: res.data.restaurants, page })
            })
            .catch(err => console.log(err))
    }

    // Sorting
    handleSort = (sort) => {
        const { mealtype, location, page, cuisine } = this.state;

        const filterObj = {
            mealtype: mealtype,
            location: location,
            page,
            sort,
            cuisine: cuisine.length > 0 ? cuisine : undefined
        }

        axios({
            url: 'http://localhost:5500/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/JSON' },
            data: filterObj
        })
            .then(res => {
            this.setState({ restaurant: res.data.restaurants, sort })
            })
            .catch(err => console.log(err))
    }

    // Cuisine
    handleCuisineChange = (i) => {
        let tempCuisine = this.state.cuisine.slice();
        
        if (tempCuisine.indexOf(i) === -1){
            tempCuisine.push(i);
        } else {
            tempCuisine.splice(tempCuisine.indexOf(i), 1);
        }
        

        const { mealtype, location, page, sort } = this.state;

        const filterObj = {
            mealtype: mealtype,
            location: location,
            page,
            sort,
            cuisine: tempCuisine.length > 0 ? tempCuisine : undefined
        }

        axios({
            url: 'http://localhost:5500/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/JSON' },
            data: filterObj
        })
            .then(res => {
            this.setState({ restaurant: res.data.restaurants, cuisine: tempCuisine })
            })
            .catch(err => console.log(err))
    }

    // to go to the Details Page
    handleDetailsPage = (resId) => {
        this.props.navigate(`/details?restaurant=${resId}`);
    }

    render(){
        const { mealtype, restaurant, locations } = this.state;
        return(
            <div>
                {/* <!--Navbar--> */}
                <nav className="navbar bg-danger position-static" style={{ "top": "0", "width": "100%", "z-index": "-1" }} data-bs-theme="">
                    <div className="container">
                        <div className="navbar-brand text-danger circle">
                            <h2 className="logo">e!</h2>
                        </div>
                        {/*<form className="d-flex nav-form">
                            <button type="button" className="btn btn-danger">Login</button>
                            <button type="button" className="btn btn-outline-light">Create an account</button>
                        </form>*/}
                     </div>
                </nav> 

                {/* <!--Filter Page--> */}
                <div className="container mb-5">
                    { console.log(mealtype) }
                    { mealtype ? 
                        <h2 className="filter-heading mt-3"> { mealtype } Places in Mumbai</h2>
                        :
                        <h2 className="filter-heading mt-3"> XYZ Places in Mumbai</h2>
                    }
                    

                    {/* <!--Filters--> */}
                    <div className="filter-box mt-2 pb-4">
                        <h5 className="filter-heading mt-2">Filters</h5>

                        <p className="filter-subheading">Select Location</p>

                        <select className="form-control selectLocation" onChange={this.handleLocationChange}>
                                    { locations.map((item) => {
                                        return(
                                            <option value={ item.city_id }> { item.name } </option>
                                        )
                                    })}
                        </select>

                        <p className="filter-subheading mt-4">Cuisine</p>

                        <input type="checkbox" id="1" name="Cuisine" value="North Indian" onChange={() => this.handleCuisineChange(1)} /> 
                            <label for="1" className="filter-content"> North Indian</label> <br />

                        <input type="checkbox" id="2" name="Cuisine" value="South Indian" onChange={() => this.handleCuisineChange(2)} /> 
                            <label for="2" className="filter-content">South Indian</label> <br />

                        <input type="checkbox" id="3" name="Cuisine" value="Chinese" onChange={() => this.handleCuisineChange(3)} /> 
                            <label for="3" className="filter-content">Chinese</label> <br />

                        <input type="checkbox" id="4" name="Cuisine" value="Fast Food" onChange={() => this.handleCuisineChange(4)} /> 
                            <label for="4" className="filter-content">Fast Food</label> <br />

                        <input type="checkbox" id="5" name="Cuisine" value="Street Food" onChange={() => this.handleCuisineChange(5)} /> 
                            <label for="5" className="filter-content">Street Food</label> <br />
                        

                        <p className="filter-subheading mt-4">Cost For Two</p>

                        <input type="radio" id="500" name="costfortwo" value="Less than 500" /> <label for="500" className="filter-content">Less than `500</label> <br />
                        <input type="radio" id="1000" name="costfortwo" value="500 to 1000" /> <label for="1000" className="filter-content">` 500 to ` 1000</label> <br />
                        <input type="radio" id="1500" name="costfortwo" value="1000 to 1500" /> <label for="1500" className="filter-content">` 1000 to ` 1500</label> <br />
                        <input type="radio" id="2000" name="costfortwo" value="1500 to 2000" /> <label for="2000" className="filter-content">` 1500 to ` 2000</label> <br />
                        <input type="radio" id="2000+" name="costfortwo" value="2000+" /> <label for="2000+" className="filter-content">` 2000+</label> <br />

                        <h5 className="filter-heading mt-4">Sort</h5>

                        <input type="radio" id="ltoh" name="Sort" value="Price low to high" onChange={() => this.handleSort(1)} /> <label for="ltoh" className="filter-content">Price low to high</label> <br />
                        <input type="radio" id="htol" name="Sort" value="Price high to low" onChange={() => this.handleSort(-1)} /> <label for="htol" className="filter-content">Price high to low</label> <br />

                    </div>

                    {/* <!--Filter Result--> */}
                    <div className="result-box mt-2">

                        { restaurant.length != 0 ? 
                         restaurant.map((item) => {
                            return(

                                <div className="results" onClick={() => this.handleDetailsPage(item._id)}>
                                    <div className="d-flex">
                                        <div className="lt-box">
                                            <img src="./img/1.png" className="img-fluid img-qs" />
                                        </div>
                                        <div className="rt-box">
                                            <h4 className="result-heading">{ item.name }</h4>
                                            <p className="result-subheading">{ item.locality }</p>
                                            <p className="result-text">{ item.address }</p>
                                        </div>
                                    </div>
                                    
                                    <hr style= {{ color: 'grey' }} />

                                    <div className="d-flex">
                                        <div className="ll-box">
                                            <p className="result-text">CUISINES:</p>
                                            <p className="result-text">COST FOR TWO:</p>
                                        </div>
                                        <div className="rl-box">
                                            <p className="result-text-blue">{ item.Cuisine.map((data) => `${data.name}   `) }</p>
                                            <p className="result-text-blue">₹{ item.cost }</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        ) : <div className="results">
                                <div className='No_Elements'> 
                                    Sorry. No result found 
                                </div>
                            </div>
                            }

                        
                                

                        { 
                            /* <!--Pagination--> */
                        }
                        
                        { restaurant.length != 0 ?
                            <div className="mt-5">
                                <ul className="pagination justify-content-center">
                                    <li className="page-item">
                                        <a className="page-link" href="#">
                                            <span> { "<" } </span>
                                        </a>
                                    </li>

                                    <li className="page-item">
                                        <a className="page-link" href="#" onClick={() => this.pagination(1)}>1</a></li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" onClick={() => this.pagination(2)}>2</a></li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" onClick={() => this.pagination(3)}>3</a></li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" onClick={() => this.pagination(4)}>4</a></li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" onClick={() => this.pagination(5)}>5</a></li>
                                    <li className="page-item">
                                        
                                        <a className="page-link" href="#">
                                        <span> { ">" } </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        : null }
                    </div>
                </div>

            </div>
        )
    }

}

export default navHook(Filter);