import { env } from "@/env";
import Elysia from "elysia";
import { GoogleMapsClient } from "../client";

export const FindPlace = new Elysia().get("find-place", async () => {
  try {
    const values = await GoogleMapsClient.geocode({
      params: {
        // place_id: "ChIJ2-1R3Nn1URoRjaQT4QnAzL0",
        // locations: [{ lat: -584, lng: -6858 }],

        key: env.GOOGLE_MAPS_API_KEY,
      },
    }).then((re) => {
      return re.data.results[0];
    });

    return {
      formatted_address: values.formatted_address,
      geometry: values.geometry,
      place_id: values.place_id,
    };
  } catch (error) {
    console.error(error);
  }
});
