const API_KEY = '477c80e47d4a95e8e264f08a6d5f75b6'
const BASE_URL = "http://api.openweathermap.org/geo/1.0"

// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={477c80e47d4a95e8e264f08a6d5f75b6}

const getWeatherData = (infoType , searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({...searchParams , appid:API_KEY});
    
    return fetch(url)
     .then((res)=> res.json())
};
const getFormatedWeatherData = async (searchParams) => {
    const formatedCurrentWeather = await getWeatherData('weather')
}