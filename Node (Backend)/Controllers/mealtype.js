const Mealtype = require('../DataBase/mealtype');

exports.getMealtypes = (req, res) => {
    Mealtype.find()
        .then(response => {
            res.status(200).json({
                message: "Mealtypes fetched Successfully", 
                mealtype: response
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
    
}