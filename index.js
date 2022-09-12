// On appelle Express
const express = require('express');

// On crée le Serveur
const app = express()

// On récupère la route
app.get('/', function (req, res) {
  res.send('Hello World !!')
})

// Pour Node on va utiliser le port 4000.
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});