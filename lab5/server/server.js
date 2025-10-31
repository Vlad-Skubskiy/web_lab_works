const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../public'))); 
app.use(cors());
app.use(bodyParser.json());


const DATA_FILE = path.join(__dirname, 'animals.json'); 

let animals = [];
if (fs.existsSync(DATA_FILE)) {
  try {
    const fileData = fs.readFileSync(DATA_FILE, 'utf-8');

    animals = fileData.trim() ? JSON.parse(fileData) : []; 
    console.log(`[START] Успішно завантажено тварин: ${animals.length}`);
  } catch (err) {
    console.error(`[START] ❌ ПОМИЛКА JSON-парсингу: ${err.message}`);
    animals = [];
  }
} else {
    console.error(`[START] ❌ ПОМИЛКА: Файл animals.json не знайдено за шляхом: ${DATA_FILE}`);
}

function saveAnimals() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(animals, null, 2));
}

function processAnimals(data, search, sortBy) {
  let result = [...data]; 
  const searchQuery = search ? search.toLowerCase().trim() : '';
  
  if (searchQuery) {
    result = result.filter(a => {
      const name = a.name?.toLowerCase() || '';
      const description = a.description?.toLowerCase() || '';
      return name.includes(searchQuery) || description.includes(searchQuery);
    });
  }

  if (sortBy === 'expense') {
    result.sort((a, b) => (b.dailyExpense || 0) - (a.dailyExpense || 0));
  }
  
  return result;
}



app.get('/animals', (req, res) => {
  const { search, sort } = req.query;
  const resultAnimals = processAnimals(animals, search, sort);
  res.json(resultAnimals); 
});


app.get('/animals/total-expense', (req, res) => {
    const { search, sort } = req.query;
    const filteredAnimals = processAnimals(animals, search, sort);
    const total = filteredAnimals.reduce((sum, a) => sum + (parseFloat(a.dailyExpense) || 0), 0);
    res.json({ totalExpense: total.toFixed(2) }); 
});


app.post('/animals', (req, res) => {
  const newAnimal = { id: Date.now(), ...req.body };
  animals.push(newAnimal);
  saveAnimals();
  res.json(newAnimal);
});

app.put('/animals/:id', (req, res) => {
  const id = parseInt(req.params.id);
  animals = animals.map(a => (a.id === id ? { ...a, ...req.body } : a));
  saveAnimals();
  res.json({ message: 'Updated successfully' });
});

app.delete('/animals/:id', (req, res) => {
  const id = parseInt(req.params.id);
  animals = animals.filter(a => a.id !== id);
  saveAnimals();
  res.json({ message: 'Deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});