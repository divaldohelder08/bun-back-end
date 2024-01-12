import { env } from "@/env";
import { Client } from "@googlemaps/google-maps-services-js";
import Elysia, { t } from "elysia";
import { z } from "zod";

//         fields: ['formatted_address', 'geometry', 'name', 'place_id'],

const client = new Client({});

export const PlacesService = new Elysia().get(
  "/find-place",
  async ({ query }) => {
    // const lat = parseFloat(String(query.lat));
    // const lng = parseFloat(String(query.lng));
    const { lat, lng } = z
      .object({
        lng: z.coerce.number(),
        lat: z.coerce.number(),
      })
      .parse(query);
    const GOOGLE_MAPS_API_KEY = env.GOOGLE_MAPS_API_KEY;
    console.log(GOOGLE_MAPS_API_KEY);
    return await client
      .elevation({
        params: {
          locations: [{ lat, lng }],
          key: "AIzaSyDwlS9OSEtoTMkJXzAP89C25oaq1wS39_E",
        },
        timeout: 1000, // milliseconds
      })
      .then((response) => {
        console.log(response.data.results[0].elevation);
      })
      .catch((e) => {
        console.error(e.response.data.error_message);
      });
  },
  {
    query: t.Object({
      lng: t.Numeric(),
      lat: t.Numeric(),
    }),
  }
);
