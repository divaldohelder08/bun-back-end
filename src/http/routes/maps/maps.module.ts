import { Client as GoogleMapsClient } from "@googlemaps/google-maps-services-js";
import { Module } from "@nestjs/common";
import { DirectionsController } from "./directions/directions.controller";
import { DirectionsService } from "./directions/directions.service";
import { PlacesController } from "./places/places.controller";
import { PlacesService } from "./places/places.service";

@Module({
  providers: [
    {
      provide: GoogleMapsClient,
      useValue: new GoogleMapsClient({}),
    },
    PlacesService,
    DirectionsService,
  ],
  controllers: [PlacesController, DirectionsController],
  exports: [DirectionsService],
})
export class MapsModule {}
