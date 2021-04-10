const { Pizza } = require('../models')

const pizzaController = {
    
    // get all pizzas
    // callback for GET /api/pizzas route
    getAllPizza(req, res) {
        Pizza.find({})
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },

    //get one pizza by id
    // destructure params out of the entire req
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
        .then(dbPizzaData => {
            // If no pizza is found, send 404
            if (!dbPizzaData) {
              res.status(404).json({ message: 'No pizza found with this id!' });
              return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // createPizza
    createPizza({ body }, res) {
    Pizza.create(body)
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.status(400).json(err));
    },
    
    // update pizza by id
    // mongoose finds the single doc we want to update and updates and returns the updated doc
    // { new: true } makes it return a new version of the doc instead of the original
    updatePizza({ params, body }, res) {
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({ message: 'No pizza found with this id!' });
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete pizza
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
            res.status(404).json({ message: 'No pizza found with this id!' });
            return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    }
  
}

module.exports = pizzaController;