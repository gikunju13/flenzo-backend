// server.js
const express = require('express');
const cors = require('cors');
const app = express();

//Preparing Backend
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Flenzo Backend is Running!');
});

// Product route
const fs = require('fs');

app.get('/products', (req, res) => {

  fs.readFile('./data/products.json', 'utf8', (err, data) => {

    if (err) {
      return res.status(500).json({ error: 'Cannot read products' });
    }

    res.json(JSON.parse(data));

  });

});

app.get('/products/:id', (req, res) => {

  const productId = parseInt(req.params.id);

  fs.readFile('./data/products.json', 'utf8', (err, data) => {

    if (err) {
      return res.status(500).json({ error: 'Cannot read products' });
    }

    const products = JSON.parse(data);

    const product = products.find(p => p.id === productId);

    if(!product){
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);

  });

});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});