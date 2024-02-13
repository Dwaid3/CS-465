const mongoose = require('mongoose')
const model = mongoose.model('trips')

//GeT: /trips - list all the trips
const tripsList = async(req,res) =>{
    try {
        const trips = await model.find({}).exec();
        if (!trips || trips.length === 0) {
            return res.status(404).json({ "message": "No trips found" });
        }
        return res.status(200).json(trips);
    } catch (err) {
        return res.status(500).json(err);
    }

}

module.exports = 
{
    tripsList
}