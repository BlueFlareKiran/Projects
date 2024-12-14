import express from 'express';
import mongoose from 'mongoose';
import Employee from './models/Employee.mjs';

const app = express();
const Port = 3000;

// Connect to MongoDB
await mongoose.connect('mongodb://127.0.0.1:27017/company');

// Set up view engine
app.set('view engine', 'ejs');

// Function to get a random element from an array
const getRandom = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

app.get('/', (req, res) => {
  res.render('index', { foo: 'FOO' });
});

await Employee.deleteMany({});

const names = ["Kiran", "Alice", "Bob", "Eve", "Charlie", "David"];
const cities = ["New York", "San Francisco", "London", "Tokyo", "Berlin", "Sydney"];
const programmingLanguages = ["Python", "JavaScript", "Java", "C++", "Go", "Ruby"];

app.get('/generate', async (req, res) => {
  for (let index = 0; index < 12; index++) {
    const e = new Employee({
      name: getRandom(names),
      salary: Math.floor(Math.random() * 1000000), // Random salary between 0 and 1,000,000
      language: getRandom(programmingLanguages),
      city: getRandom(cities),
      isManager: Math.random() > 0.5 // 50% chance to be true
    });
    await e.save(); // Save the employee to the database
    console.log(e); // Log the created employee
  }

  res.render('index', { foo: 'FOO' });
});

app.listen(Port, () => {
  console.log('Server is running on port', Port);
});
