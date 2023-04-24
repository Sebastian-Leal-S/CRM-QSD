const Clients = require('../models/Client');

const getHome = async (req, res) => {
  try {
    const clientsDB = Clients.find();
    res.render('home', {clients: clientsDB});
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getHome,
};
