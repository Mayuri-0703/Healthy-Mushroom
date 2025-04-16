const form = document.getElementById('mushroom-form');
const resultDiv = document.getElementById('result');
const formContainer = document.getElementById('form-container');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Collect form data
    const formData = new FormData(form);
    const formValues = Array.from(formData.values()).map(value => parseFloat(value));

    // Send POST request to the backend for prediction
    const response = await fetch('/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues)
    });

    const result = await response.json();

    // Show result on the page
    formContainer.style.display = 'none';
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = result.prediction === 'Edible' ?
        '<h2>Yay! It\'s edible. Enjoy your meal!</h2>' :
        '<h2>Oops! It\'s poisonous. Don\'t eat it!</h2>';
});
