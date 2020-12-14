const mongoose = require("mongoose")
const Schema = mongoose.Schema


const ratingSchema = new Schema (
    { 
        ratedBy: String,
        rating: {type: Number, min: 1, max: 10 },
        content: String,
    }, 
    {
        timestamps: true
    }    
);

const heroSchema = new Schema (
    {
        name: String,
        apiId: Number,
        imageUrl: String,
        stats: [],
        addedBy: [{type: Schema.Types.ObjectId, ref: "User"}],
        starredBy:[{type: Schema.Types.ObjectId, ref: "User"}],
        rating: [ratingSchema]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Hero", heroSchema)