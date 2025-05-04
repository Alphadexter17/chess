document.getElementById('fetchWeather').addEventListener('click', fetchWeather);

const weatherData = {
    "New York": {
        temperature: "15°C",
        humidity: "60%",
        condition: "Sunny"
    },
    "London": {
        temperature: "10°C",
        humidity: "75%",
        condition: "Cloudy"
    },
    "Paris": {
        temperature: "12°C",
        humidity: "65%",
        condition: "Rainy"
    },
    "Tokyo": {
        temperature: "22°C",
        humidity: "80%",
        condition: "Clear"
    },
    "Mumbai": {
        temperature: "30°C",
        humidity: "85%",
        condition: "Humid"
    }
};

function fetchWeather() {
    const city = document.getElementById('cityInput').value.trim();

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    // Simulate AJAX call (searching for city in the map)
    setTimeout(() => {
        if (weatherData[city]) {
            displayWeather(weatherData[city]);
        } else {
            displayError();
        }
    }, 500);  // Simulating network delay
}

function displayWeather(weather) {
    // Hide error message if any
    document.getElementById('errorMessage').classList.add('d-none');

    // Display weather information
    document.getElementById('weatherInfo').classList.remove('d-none');
    document.getElementById('temperature').textContent = `Temperature: ${weather.temperature}`;
    document.getElementById('humidity').textContent = `Humidity: ${weather.humidity}`;
    document.getElementById('condition').textContent = `Condition: ${weather.condition}`;
}

function displayError() {
    // Hide weather information if any
    document.getElementById('weatherInfo').classList.add('d-none');

    // Display error message
    document.getElementById('errorMessage').classList.remove('d-none');
}
