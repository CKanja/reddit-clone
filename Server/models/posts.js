const mongoose = require("mongoose");
// const AutoIncrementPost = require('mongoose-sequence')(mongoose);

const { Schema } = mongoose;

const Comment = new mongoose.Schema({
     _id: Number,
    content: {
            type: String
            },
    timePosted: {
            type: Date,
            default: Date.now
            },
    _creator: {
            type: Schema.ObjectId, ref:'User'
              }
}
)

const PostSchema = new mongoose.Schema({
    _Postid: Number,
    title: {
    type: String,
    required: true,
  },
    content: {
        type: String,
        required: true,
  },
  dateTime: {
        type: Date,
        default: Date.now
  },
  downvotes: {
        type: Number,
  },
  upvotes: {
        type: Number,
  },
  category: {
            type: Array        
        },
//   _comments: {
//             type: Schema.ObjectId, ref:'Comment'
//               }
    comments: [Comment]
 

});


// PostSchema.plugin(AutoIncrementPost);
const Post = mongoose.model("Post", PostSchema);
const CommentMod = mongoose.model("Comment", Comment);

module.exports = Post;