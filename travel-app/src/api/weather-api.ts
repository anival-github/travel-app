import { LanguageType } from '../redux/localisation-reducer';

const weatherAPI = {
  async getWeather(city: string, currentLanguage: LanguageType) {
    const lang = currentLanguage.split('-')[0]; // 'ru-RU' -> 'ru'
    const weatherAPIurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=f1fe9aa9627ddefce0cda42a7d10e141&units=metric`;
    const res = await fetch(weatherAPIurl);
    const data = await res.json();
    return data;
  },
};

export default weatherAPI;
