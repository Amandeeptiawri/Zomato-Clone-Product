const Restaurants = require('../DataBase/restaurant');

exports.getRestaurant = (req, res) => {
    Restaurants.find({},{})
        .then(response => {
            res.status(200).json({
                message: "Restaurants fetched Successfully", 
                restaurants: response
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
    
}

exports.filterRestaurant = (req, res) => {
    let { location, lcost, hcost, cuisine, mealtypes, sort, page } = req.body;

    sort = sort ? sort : 1          // 1 -> low to high     &       -1 -> high to low
    page = page ? page : 1          // Page 1 is the default state

    const itemsPerPage = 2;
    let startIndex = page * itemsPerPage - itemsPerPage;
    let endIndex = page * itemsPerPage;

    let filterObj = {};

    location && (filterObj["city"] = location);                             // City id to match with the location
    lcost && hcost && (filterObj["cost"] = { $gte: lcost, $lte: hcost});    // Comparing the cost of the restaurant
    cuisine && (filterObj["Cuisine.cuisine"] = { $in: cuisine } );          // Filtering multiple cuisines of the restaurant
    mealtypes && (filterObj["type.mealtype"] = mealtypes);

    //console.log(filterObj);

    Restaurants.find( filterObj ).sort({cost: sort})
        .then(response => {
            const filteredResponses = response.slice(startIndex, endIndex);
            res.status(200).json({
                message: "Restaurants fetched Successfully", 
                restaurants: filteredResponses
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })

}