// we could import entire mongoose library, but we only need to worry about Schema constructor and model function for this
const { Schema, model } = require('mongoose')

// create pizza schema using Schema constructor from Mongoose
const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: []
})

// create model using pizza schema and export it
const Pizza = model('Pizza', PizzaSchema)

module.exports = Pizza