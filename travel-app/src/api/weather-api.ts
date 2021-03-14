const weatherAPI = {
  async getWeather(city: string) {
    const weatherAPIurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=f1fe9aa9627ddefce0cda42a7d10e141&units=metric`;
    const res = await fetch(weatherAPIurl);
    const data = await res.json();
    return data;
  },
};

export default weatherAPI;
