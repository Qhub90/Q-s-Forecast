const cityForm = document.querySelector('.change-location');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img')
const forecast = new Forecast();

// // Grabs the city and weather info
// const updateCity = async (city) => {

//     const cityDets = await getCity(city);
//     const weather = await getWeather(cityDets.Key);
    
//     return { cityDets, weather };
// }

// Updates UI
const updateUI = (data) => {

    // const cityDets = data.cityDets;
    // const weather = data.weather;

    // destructure properties
    const { cityDets, weather} = data

    // update details template
    details.innerHTML =
        `<h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Imperial.Value}</span>
            <span>&deg;F</span>
        </div>`;

        // update the night/day & icons images
        const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
        icon.setAttribute('src', iconSrc);

        // We use "ternary" instead of "if"
        let timeSrc = weather.IsDayTime ?  'img/day.svg' :  'img/night.svg';
        
        // let timeSrc = null;
        // if(weather.IsDayTime) {
        //     timeSrc = 'img/day.svg';
        // } else {
        //     timeSrc = 'img/night.svg'
        // }

        time.setAttribute('src', timeSrc);

        // remove d-nne class if present
        if(card.classList.contains('d-none')){
            card.classList.remove('d-none');
        }
}

cityForm.addEventListener('submit', e => {
    // prevent default action
    e.preventDefault();

    const city = cityForm.city.value.trim();
    localStorage.setItem('city',city);
    cityForm.reset();

    // update the ui with new city
    forecast.updateCity(city)
      .then(data => updateUI(data))
      .catch(err => console.log(err))
})

if(localStorage.getItem('city')) {
    forecast.updateCity(localStorage.getItem('city'))
      .then(data => updateUI(data))
      .catch(err => console.log(err))
}