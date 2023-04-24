// model clients
const Clients = require('../models/Client');

// create client
const addClient = async (req, res) => {
  const {firstName, lastName, country, email, phone, regDate} = req.body;
  try {
    let newClientDB = new Clients({
      firstName: firstName,
      lastName: lastName,
      country: country,
      email: email,
      phone: phone,
      regDate: regDate,
    });
    await newClientDB.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.send('Error al agerrgar el cliente');
  }
};

// get clients
const getAllClients = async (req, res) => {
  try {
    let clients = await Clients.find().lean();
    res.json(clients);
  } catch (error) {
    console.error(error);
    res.send('Error al obtener los clientes');
  }
};

// update client
const getOneClient = async (req, res) => {
  const {id} = req.params;
  try {
    let client = await Clients.findById(id).lean();
    res.json(client);
  } catch (error) {
    console.error(error);
    res.send('Error al actualizar el cliente');
  }
};

const updateClient = async (req, res) => {
  const {id} = req.params;
  const {firstName, lastName, country, email, phone, regDate} = req.body;
  try {
    const client = await Clients.findById(id);
    if (!client) {
      console.log('No existe');
      return res.send('Error no existe el documento a editar');
    }

    await Clients.findByIdAndUpdate(id, {
      firstName: firstName,
      lastName: lastName,
      country: country,
      email: email,
      phone: phone,
      regDate: regDate,
    });
    res.redirect('/');
  } catch (error) {
    console.error(error);
  }
};

// delete client
const deleteClient = async (req, res) => {
  const {id} = req.params;
  try {
    await Clients.findByIdAndDelete(id);
    res.send('Todo salio correcto');
  } catch (error) {
    console.error(error);
    res.send('Error al eliminar cliente');
  }
};

module.exports = {
  addClient,
  getAllClients,
  getOneClient,
  updateClient,
  deleteClient,
};
