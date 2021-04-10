// we could import entire mongoose library, but we only need to worry about Schema constructor and model function for this
const { Schema, model } = require('mongoose')

//import date formatter for getter
const dateFormat = require('../utils/dateFormat')

// create pizza schema using Schema constructor from Mongoose
const PizzaSchema = new Schema(
    {
      pizzaName: {
        type: String
      },
      createdBy: {
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now,
        // getter
        get: (createdAtVal) => dateFormat(createdAtVal)
      },
      size: {
        type: String,
        default: 'Large'
      },
      toppings: [],
      comments: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Comment'
        }
      ]
    },
    {
      toJSON: {
        // tell mongoose model to use any getters or vituals we add
        virtuals: true,
        getters: true
      },
      id: false
    }
);

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

// create model using pizza schema and export it
const Pizza = model('Pizza', PizzaSchema)

module.exports = Pizza