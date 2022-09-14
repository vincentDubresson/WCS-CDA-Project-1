const { getWilders, getWilderById, createWilder, deleteWilder, updateWilder } = require("../models/Wilder/wildersManager");

// Fonction get pour récupérer les Wilders
const get = async (req, res) => {
  const wilders = await getWilders();
  res.json(wilders);
};

// Fonction getById pour récupérer un Wilder
const getById = async(req, res) => {
  const { id } = req.params;
  try {
    const wilder = await getWilderById(id);
    res.status(201).json(wilder);
  } catch (error) {
    res.status(404).json({error: error.message});
  }
}

// Fonction post pour créer un nouveau wilder (prise en charge erreurs)
const post = async (req, res) => {
  const { firstName, lastName } = req.body;
  if (!firstName || !lastName) {
    res.status(404).json({error: "Firstname and lastname are mandatory."});
  } else {
    const newWilder = await createWilder(firstName, lastName);
    res.status(201).json(newWilder);
  }
}

// Fonction put pour modifier un wilder
const put = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;

  if (!firstName || !lastName) {
    res.status(404).json({error: "Firstname and lastname are mandatory."});
  } else {
    try {
      const wilderToUpdate = await updateWilder(id, firstName, lastName);
      res.status(201).json(wilderToUpdate);
    } catch (error) {
      res.status(404).json({error: error.message});
    }
  }
}

// Fonction delete pour supprimer un wilder
const del = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteWilder(id);
    res.json({ message: `Wilder ${id} has been successfully removed.` });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  get,
  getById,
  post,
  put,
  del,
}