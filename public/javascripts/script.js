document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('get-weather-btn').addEventListener('click', function() {
        const city = document.getElementById('city-input').value;
        getCoordinates(city);
    });

    function getCoordinates(city) {
        fetch(`/coordinates?city=${city}`)
            .then(response => response.json())
            .then(data => {
                const latitude = data.results[0].geometry.lat;
                const longitude = data.results[0].geometry.lng;
                getWeather(latitude, longitude);
            })
            .catch(error => console.error('Erreur lors de la récupération des coordonnées:', error));
    }

    function getWeather(lat, lng) {
        fetch(`/weather?lat=${lat}&lng=${lng}`)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Affichez la réponse de l'API pour déboguer
                if (data.hours && data.hours.length > 0) {
                    const weather = data.hours[0];
                    const airTemperature = weather.airTemperature ? weather.airTemperature.noaa : 'Non disponible';
                    const pressure = weather.pressure ? weather.pressure.noaa : 'Non disponible';
                    const humidity = weather.humidity ? weather.humidity.noaa : 'Non disponible';
                    const cloudCover = weather.cloudCover ? weather.cloudCover.noaa : 'Non disponible';
                    const precipitation = weather.precipitation ? weather.precipitation.noaa : 'Non disponible';
                    const visibility = weather.visibility ? weather.visibility.noaa : 'Non disponible';
                    const windSpeed = weather.windSpeed ? weather.windSpeed.noaa : 'Non disponible';
                    const windDirection = weather.windDirection ? weather.windDirection.noaa : 'Non disponible';
        
                    document.getElementById('temperature').textContent = `${airTemperature}°C`;
                    document.getElementById('air-pressure').textContent = `${pressure}`;
                    document.getElementById('humidity').textContent = `${humidity}`;
                    document.getElementById('cloud-coverage').textContent = `${cloudCover}`;
                    document.getElementById('precipitation').textContent = `${precipitation}`;
                    document.getElementById('visibility').textContent = `${visibility}`;
                    document.getElementById('wind-speed').textContent = `${windSpeed}`;
                    document.getElementById('wind-direction').textContent = `${windDirection}`;
                    document.getElementById('ville').textContent = document.getElementById('city-input').value;
                } else {
                    console.error('Aucune donnée horaire trouvée dans la réponse.');
                }
            })
            .catch(error => console.error('Erreur lors de la récupération des données météo:', error));
    }
});
