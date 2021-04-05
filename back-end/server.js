const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/journal', {
  useNewUrlParser: true
});

// Create a scheme for entries in the journal: date, vocabulary, description, and entry.
const entrySchema = new mongoose.Schema({
  date: String,
  vocab: String,
  desc: String,
  entry: String,
});

// Create a model for entries in a journal.
const Entry = mongoose.model('Entry', entrySchema);

// Create a new entry in the journal that takes a date, vocabulary, description, and entry.
app.post('/api/entries', async (req, res) => {
  const entry = new Entry({
    date: req.body.date,
    vocab: req.body.vocab,
    desc: req.body.desc,
    entry: req.body.entry,
  });
  try {
    await entry.save();
    res.send(entry);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the entries in the journal.
app.get('/api/entries', async (req, res) => {
  try {
    let entries = await Entry.find();
    res.send(entries);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/entries/:id', async (req, res) => {
  try {
    await Entry.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/entries/:id', async (req, res) => {
  try {
    let entry = await Entry.findOne({
      _id: req.params.id
    });
    entry.desc = req.body.desc;
    entry.entry = req.body.entry;
    entry.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
