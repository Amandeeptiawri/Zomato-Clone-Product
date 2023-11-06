const Menu = require('../DataBase/menu');

exports.getMenu = (req, res) => {

    const { resId } = req.params;

    Menu.find({ restaurantId: resId}, {})
        .then(response => {
            res.status(200).json({
                message: "Menu fetched Successfully", 
                menu: response
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
    
}