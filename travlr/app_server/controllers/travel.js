const fs = require('fs');
const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf-8'));

/* GET travel view */
const travel = (req, res) => {
    console.log('Travel route hit!');
    res.render('travel', { title: 'Travlr Getaways', trips});
   };
   module.exports = {
    travel
   };