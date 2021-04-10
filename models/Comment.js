// with types object imported to set custom id for replys
const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const ReplySchema = new Schema(
  {
    //set custom reply ID to avoid confusion with the parent comment id
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    replyBody: {
      type: String
    },
    writtenBy: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
)

const CommentSchema = new Schema({
    writtenBy: {
      type: String
    },
    commentBody: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    //associate replies with comments
    //will populate with array of data that adheres to the reply schema definition
    replies: [ReplySchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// virtual to get the total reply count on a comment
CommentSchema.virtual('replyCount').get(function() {
  return this.replies.length;
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;