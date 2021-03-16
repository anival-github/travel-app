import { Country } from './Types';
import { SERVER_PATH, COUNTRIES_PATH } from './Const';

async function getAllCountries(): Promise<Country[]> {
  let arrayOfCountries: Country[] = [];
  const response: Response = await fetch(`${SERVER_PATH}${COUNTRIES_PATH}/getall`);

  if (response.status === 200) {
    arrayOfCountries = await response.json();
  } else {
    console.error('Fetchertert error', response);
  }

  return arrayOfCountries;
}

async function getCountryByNameOrCapital(searchStr: string = ''): Promise<Country> {
  const response: Response = await fetch(`${SERVER_PATH}${COUNTRIES_PATH}/getbyname/${searchStr}`);
  const country: Country = await response.json();
  return country;
}

export { getAllCountries, getCountryByNameOrCapital };
