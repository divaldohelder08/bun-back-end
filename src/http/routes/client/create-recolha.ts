import { Client as Gg } from "@googlemaps/google-maps-services-js";

export const MapsModule = {
  provide: "MapsService",
  useFactory: () => {
    return new Gg({});
  },
};

import { Client as GoogleMapsClient } from "@googlemaps/google-maps-services-js";

// ...

// Em algum arquivo de serviço ou componente onde você precisa do serviço Maps
const mapsService = new GoogleMapsClient({});

// Agora, você pode usar o `mapsService` onde for necessário

// ...
