const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Serve the HTML form when visiting the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
app.post('/', (req, res) => {
  const { adjective, pluralNoun, noun, verb, place } = req.body;

  // Validation
  if (!adjective || !pluralNoun || !noun || !verb || !place) {
    res.send(`
      <h1>Submission Failed</h1>
      <p>Please fill out ALL fields</p>
      <a href="/">Go Back to Form</a>
    `);
    return;
  }

  // Construct the Mad Lib story
  const madLib = `
    In a faraway land, there was a <strong>${adjective}</strong> kingdom ruled by a wise <strong>${noun}</strong>. 
    One day, a band of <strong>${pluralNoun}</strong> set off on a quest to <strong>${verb}</strong> to the mystical <strong>${place}</strong>, 
    where they hoped to find a legendary <strong>${adjective}</strong> artifact.
`;


  // Send the response
  res.send(`
    <h1>Submission Successful</h1>
    <p>${madLib}</p>
    <a href="/">Go Back to Form</a>
  `);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
