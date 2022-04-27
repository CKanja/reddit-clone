const mongoose = require("mongoose");
// const AutoIncrementPost = require('mongoose-sequence')(mongoose);

const PostSchema = new mongoose.Schema({
    _id: Number,
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
        required: true,
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
  comments: [{ type: Array,
        _id: Number,
        content:{
                    type: String
                },
        timePosted: {
                    type: Date
                    },
        username: {
                    type: String
        }
  }],
});


// PostSchema.plugin(AutoIncrementPost);
const Post = mongoose.model("Post", PostSchema);

module.exports = Post;