const { Comment, Pizza } = require('../models')

const commentController = {
    // add comment to pizza
    addComment({ params, body }, res) {
        console.log(body);
        Comment.create(body)
          .then(({ _id }) => {
            return Pizza.findOneAndUpdate(
              { _id: params.pizzaId },
              //$push method to add the comments _id to a pizza we want to update
              // this method adds data to an array
              { $push: { comments: _id } },
              { new: true }
            );
        })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
              res.status(404).json({ message: 'No pizza found with this id!' });
              return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.json(err));
    },

    // remove comment
    removeComment({ params }, res) {
        Comment.findOneAndDelete({ _id: params.commentId })
          .then(deletedComment => {
            if (!deletedComment) {
              return res.status(404).json({ message: 'No comment with this id!' });
            }
            return Pizza.findOneAndUpdate(
              { _id: params.pizzaId },
              // take that data and use it to identify and remove it from the associated pizza using mongo $pull
              { $pull: { comments: params.commentId } },
              { new: true }
            );
        })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
              res.status(404).json({ message: 'No pizza found with this id!' });
              return;
            }
            res.json(dbPizzaData);
          })
        .catch(err => res.json(err));
    }
}

module.exports = commentController