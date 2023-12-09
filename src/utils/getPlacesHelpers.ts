import axios from 'axios';
import { fromAddress, setKey } from 'react-geocode';

setKey(process.env.NEXT_PUBLIC_PLACES_API_KEY || '');
let coordinatesCache: Record<string, { lat: number; lng: number }> = {};

export const getCoordinates = async (address: string) => {
  if (coordinatesCache[address]) {
    return coordinatesCache[address];
  }

  try {
    const response = await fromAddress(address);
    const { lat, lng } = response.results[0].geometry.location;
    coordinatesCache[address] = { lat, lng };
    return { lat, lng };
  } catch (error) {
    console.error('coordinates error', error);
    return { lat: 0, lng: 0 };
  }
};

export const getNearbyHospitals = async (lat: number, lng: number) => {
  const data = {
    includedTypes: ['hospital'],
    maxResultCount: 10,
    locationRestriction: {
      circle: {
        center: {
          latitude: lat,
          longitude: lng
        },
        radius: 500.0
      }
    }
  };

  const headers = {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': process.env.NEXT_PUBLIC_PLACES_API_KEY || '',
    'X-Goog-FieldMask': 'places.displayName,places.formattedAddress'
  };

  return axios
    .post('https://places.googleapis.com/v1/places:searchNearby', data, {
      headers
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      console.error('getNearbyHospitals error', error);
      return [];
    });
};
