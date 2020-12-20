const mongoose = require("mongoose")
const Schema = mongoose.Schema


const ratingSchema = new Schema (
    { 
        rating: {type: Number, min: 1, max: 10 },
    }, 
    {
        timestamps: true
    }    
);

const heroSchema = new Schema (
    {
        name: String,
        secretName: String,
        apiId: Number,
        imageUrl: String,
        addedBy: [{type: Schema.Types.ObjectId, ref: "User"}],
        rating: [ratingSchema]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Hero", heroSchema)