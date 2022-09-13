const { getWilders } = require("../models/Wilder/wildersManager");

// Fonction get pour récupérer les Wilders
const get = async (req, res) => {
  const wilders = await getWilders();
  res.send(wilders);
};

module.exports = {
  get,
}