const mongoose = require('mongoose');
const { restart } = require('nodemon');
const Trip = mongoose.model('trips');
const User = mongoose.model('users')


const getUser = async (req) => {
  try {
  
      if (req.payload && req.payload.email) {
          console.log('working')
          const user = await User.findOne({ email: req.payload.email }).exec();

          if (!user) {
              throw { status: 404, message: "User not found" };
          }

          return user.name;
      } else {
          throw { status: 404, message: "nothing found" };
      }
  } catch (err) {
      console.error(err);
      throw { status: 500, message: "Internal Server Error" };
  }
};



//GeT: /trips - list all the trips
const tripsList = async(req,res) =>{
    try {
        const trips = await Trip.find({}).exec();
        if (!trips || trips.length === 0) {
            return res.status(404).json({ "message": "No trips found" });
        }
        return res.status(200).json(trips);
    } catch (err) {
        return res.status(500).json(err);
    }

}
const tripsAddTrip = async (req, res) => {
  console.log(req.payload);
    try {
        const userName = await getUser(req);
        const trip = await Trip.create({
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
      const trip = await Trip.findOne({ "code": req.params.tripCode }).exec();
  
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
    console.log('PAYOOOOOOOOOO:', req.payload);
    try {
        const userName = await getUser(req);
        console.log('before')
        const user = await getUser(req, res); 
        console.log('after')
                
        console.log(req.body);
        const trip = await Trip.findOneAndUpdate(
            { 'code': req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            { new: true }
        );

        if (!trip) {
            return res.status(404).send({
                message: "Trip not found with code " + req.params.tripCode
            });
        }

        res.send(trip);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Trip not found with code " + req.params.tripCode
            });
        }

        return res.status(500).json(err); // server error
    }
};

  

module.exports = 
{
    tripsList,
    tripsAddTrip,
    tripsFindByCode,
    tripsUpdateTrip,
    getUser
}