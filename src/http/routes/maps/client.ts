import {
  Client as googleMapsClient,
  TravelMode,
} from "@googlemaps/google-maps-services-js";
const GoogleMapsClient = new googleMapsClient({});
const driving = TravelMode.driving;
export { driving, GoogleMapsClient };
