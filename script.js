const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');


search.addEventListener("click", () => {

  const APIKey = '6c8026f18e16fc4c5a2542312bd8cfac';
  const city = document.querySelector('.search-box input').value;


  if (city === '') 
    return;



    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(responce => responce.json())
    .then(json => {
      console.log(json)
      if (json.cod === '404') {
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        console.log('error404: ', error404);
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        return;
      }

      error404.style.display = 'none';
      error404.classList.remove('fadeIn');

      const image = document.querySelector('.weather-box img');
      console.log('image: ', image);
      const temperature = document.querySelector('.weather-box .temperature');
      const description = document.querySelector('.weather-box .description');
      const humidity = document.querySelector('.weather-details .humidity span');
      const wind = document.querySelector('.weather-details .wind span');
      switch(json.weather[0].main) {
        case "Clear":
          image.src = 'images/clear.png';
          break;

        case "Rain":
          image.src = 'images/rain.png';
          break;

        case "Snow":
          image.src = 'images/snow.png';
          break;

        case "Clouds":
          image.src = 'images/clouds.png';
          break;

        case "Haze":
          image.src = 'images/haze.png';
          break;

          default:
            image.src = '';
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}<span>km/h</span>`;

      weatherBox.style.display = '';
      weatherDetails.style.display = '';
      weatherBox.classList.add('fadeIn');
      weatherDetails.classList.add('fadeIn');
      container.style.height = '590px';
      
    })  
})
