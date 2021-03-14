import { Place } from './Types';
import { SERVER_PATH, PLACES_PATH } from './Const';

async function getAllPlacess(): Promise<Place[]> {
  let arrOfPlaces: Place[] = [];
  const response = await fetch(`${SERVER_PATH}${PLACES_PATH}/getall`);
  if (response.status === 200) {
    arrOfPlaces = await response.json();
  }
  return arrOfPlaces;
}

async function getPlaceByName(searchStr: string): Promise<Place | null> {
  let place: Place | null = null;
  const response = await fetch(`${SERVER_PATH}${PLACES_PATH}/getbyname/${searchStr}`);
  if (response.status === 200) {
    place = await response.json();
  }
  return place;
}

async function getallbycountry(countryIsoCode: string): Promise<Place[]> {
  let arrOfPlaces: Place[] = [];
  const response = await fetch(`${SERVER_PATH}${PLACES_PATH}/getallbycountry/${countryIsoCode}`);
  if (response.status === 200) {
    arrOfPlaces = await response.json();
  }
  return arrOfPlaces;
}

export { getAllPlacess, getPlaceByName, getallbycountry };
