import { env } from "@/env";
import Elysia, { t } from "elysia";
import { GoogleMapsClient, driving } from "../client";

// /directions?originId=XXXX&destinationId=XXXX
export const Directions = new Elysia().get(
  "directions",
  async ({ query }) => {
    const { destinationId, originId } = query;
    const { data } = await GoogleMapsClient.directions({
      params: {
        origin: `place_id:${originId}`,
        destination: `place_id:${destinationId}`,
        key: env.GOOGLE_MAPS_API_KEY,
        mode: driving,
      },
    });
    return {
      ...data,
      request: {
        origin: {
          place_id: originId,
          location: {
            lat: data.routes[0].legs[0].start_location.lat,
            lng: data.routes[0].legs[0].start_location.lng,
          },
        },
        destination: {
          place_id: destinationId,
          location: {
            lat: data.routes[0].legs[0].end_location.lat,
            lng: data.routes[0].legs[0].end_location.lng,
          },
        },
        mode: driving,
      },
    };
  },
  {
    query: t.Object({
      originId: t.String(),
      destinationId: t.String(),
    }),
  }
);
