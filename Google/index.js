import { promises as fsPromises } from 'fs';
import { createServer } from 'http';
import axios from 'axios';

async function initApp() {
  const greetingText = 'pouette';
  const textFile = 'output.txt';

  try {
    await fsPromises.writeFile(textFile, greetingText);
    console.log("File successfully created!");

    const fileContent = await fsPromises.readFile(textFile, 'utf8');
    console.log("File content:");
    console.log(fileContent);

    startServer();
    await fetchAndStoreWebPage('http://www.google.com', 'google.html');
  } catch (error) {
    console.error('An error occurred:', error.message);
  }

}

function startServer() {
  const host = 'localhost';
  const port = 3000;
  createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Welcome to the """Google""" server!</h1>');
  }).listen(port, host, () => console.log(`Server running at http://${host}:${port}/`));
}

async function fetchAndStoreWebPage(url, outputPath) {
  try {
    const { data } = await axios.get(url);
    await fsPromises.writeFile(outputPath, data);
    console.log("HTML file created successfully");
  } catch (error) {
    console.error('Error fetching and storing web page:', error.message);
  }
}

initApp();