const index = (req, res) => {
    console.log('index route hit!');
    res.render('index', { title: 'Travlr Getaways' });
};

module.exports = {
    index
};