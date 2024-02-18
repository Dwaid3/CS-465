const mongoose = require('mongoose');
const { restart } = require('nodemon');
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
const tripsAddTrip = async (req, res) => {
    try {
        const trip = await model.create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });
        return res.status(201).json(trip);
    } catch (err) {
        return res.status(400).json(err);
    }
};



// GET: /trips:/tripCode - returns single trip
const tripsFindByCode = async (req, res) => {
    try {
      const trip = await model.findOne({ "code": req.params.tripCode }).exec();
  
      if (!trip) {
        return res.status(404).json({ "message": "Trip not found" });
      }
  
      return res.status(200).json([trip]);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ "message": "Internal server error" });
    }
  };

  const tripsUpdateTrip = async (req, res) => {
    console.log(req.body);
    model
    .findOneAndUpdate({ 'code': req.params.tripCode }, {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    }, 
    { new: true })
    .then(trip => {
        if (!trip) {
            return res
            .status(404)
            .send({
    message: "Trip not found with code " 
   + req.params.tripCode
    });
    }
    res.send(trip);
    }).catch(err => {
    if (err.kind === 'ObjectId') {
    return res
    .status(404)
    .send({
    message: "Trip not found with code " 
   + req.params.tripCode
    });
    }
    return res
    .status(500) // server error
    .json(err);
    });
   }

  

module.exports = 
{
    tripsList,
    tripsAddTrip,
    tripsFindByCode,
    tripsUpdateTrip
}