// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="
const alertsDisplay = document.getElementById("alerts-display");
const fetchButton = document.getElementById("fetch-alerts");
const stateInput = document.getElementById("state-input");
const errorMessage = document.getElementById("error-message");

const loading = document.createElement("div");
loading.id = "loading";
loading.textContent = "Loading...";
loading.classList.add("hidden");
alertsDisplay.before(loading);


// Your code here!
 async function fetchWeatherAlerts(state) {
    try{
    const response = await fetch(weatherApi + state);

    if (!response.ok) {
        throw new Error(`Error! Could not fetch weather alerts for ${state}: ${response.status} ${response.statusText}`);

    }
    const data = await response.json();
    hideError()
    displayAlerts(data);
}catch (error) {
    alertsDisplay.innerHTML=""
    showError(error.message);
}
 }

 

 function displayAlerts(data) {
    alertsDisplay.innerHTML = "";


    const summary = document.createElement("h2");
    summary.textContent = `${data.title}: ${data.features.length}`;
    alertsDisplay.appendChild(summary);

    const list = document.createElement("ul");
    data.features.forEach((alert) => {
        const listItem = document.createElement("li");
        listItem.textContent = alert.properties.headline;
        list.appendChild(listItem);
    });
    alertsDisplay.appendChild(list);
 }


fetchButton.addEventListener("click", async () => {
    const state = stateInput.value.trim();
    if (state ===""){
        showError("Please enter a state abbreviation");
        return;
    }
    
    if (!/^[A-Z]{2}$/.test(state)) {
    showError("State must be two capital letters, e.g. MN.");
    return;
}
    stateInput.value = "";
    await fetchWeatherAlerts(state);
})

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
}
 function hideError() {
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");
}

