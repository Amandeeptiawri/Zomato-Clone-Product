const Restaurants = require('../DataBase/restaurant');

exports.getRestaurantByCity = (req, res) => {
    const { askedCity } = req.params;
    Restaurants.find({ city: askedCity }, {})
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

exports.getRestaurantById = (req, res) => {
    const { askedId } = req.params;
    Restaurants.findById( askedId )
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