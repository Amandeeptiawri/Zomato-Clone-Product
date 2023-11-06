const express = require('express');

const locationController = require('../Controllers/locations');
const restaurantController = require('../Controllers/restaurant');
const restaurantControllerByCity = require('../Controllers/restaurantByCity');
const mealtypeController = require('../Controllers/mealtype');
const userController = require('../Controllers/user');
const menuController = require('../Controllers/menu');

const route = express.Router();

route.get('/locations', locationController.getLocations);           // Location List
route.get('/restaurants', restaurantController.getRestaurant);      // Restaurant List
route.get('/mealtype', mealtypeController.getMealtypes);            // Meal type List

route.post('/sighnup', userController.Sighnup);                     // User -> Sign up
route.post('/login', userController.login);                         // User -> Login

route.get('/restaurants/:askedCity', restaurantControllerByCity.getRestaurantByCity);   // Restaurant List based upon Location
route.get('/restaurant/:askedId', restaurantControllerByCity.getRestaurantById);   // Restaurant List based upon id

route.post('/filter', restaurantController.filterRestaurant);       // Filtering the restaurant

route.get('/menu/:resId', menuController.getMenu);                        // Menu type List

module.exports = route;