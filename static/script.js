'use strict';

window.addEventListener('load', function () {

  console.log("Hello World!");

});

const button = document.getElementById('submit-btn');
const text = document.getElementById('text-inpt');

document.getElementById('submitButton').addEventListener('click', function() {
  console.log("Button is clicked --------")
  var inputText = document.getElementById('inputText').value;
  fetch('https://api.cohere.ai/v1/generate', {
      method: 'POST', // or 'GET' if required by your endpoint
      body: JSON.stringify({text: inputText}), // Adjust based on your endpoint's requirements
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer <Your Key>',
      },
      max_tokens:500,
      temperature:0.5,
      k:40,
      p:0.95,
  })
  .then(response => response.json())
  .then(data => {
      document.getElementById('responseDisplay').textContent = JSON.stringify(data);
  })
  .catch((error) => {
      console.error('Error:', error);
      document.getElementById('responseDisplay').textContent = 'Error fetching response';
  });
  console.log("Button click ended --------")
  console.log("Response --------")
  console.log(response.json)
});

button.addEventListener('click', async _ => {
  try {     
    console.log('Beginning');
    const response = await fetch('https://api.cohere.ai/v1/generate', {
      method: 'post',
      body: text.value,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer <Your Key>',
      },
      max_tokens:500,
      temperature:0.5,
      k:40,
      p:0.95,
    });
    console.log('Completed!', response);
  } catch(err) {
    console.error(`Error: ${err}`);
  }
});

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(form);
  const data = new FormData(form);
  console.log(data);

  fetch("https://api.cohere.ai/v1/generate", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer <Your Key>",
    },
    max_tokens:500,
    temperature:0.5,
    k:40,
    p:0.95,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("~~~~~~~~~~~~~~~ Response from Cohere")
      console.log(data);
    });
});
