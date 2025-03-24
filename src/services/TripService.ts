import { DateTime } from "luxon";
import AxiosService from "./AxiosService";
import Trip from "../data/Trip.ts";

export interface ITrip {
   id:number
   title: string
   description: string
   firstDay: DateTime
   lastDay: DateTime
   createdAt: DateTime
   status: string
}

export default class TripService {

    private static cachedTrips?:Array<Trip>;
    static async getTrips(): Promise<Trip[]> {
        if (this.cachedTrips){
            return this.cachedTrips;
        }

        const response = await AxiosService.instance
            .authenticatedClient.get("/trip");

        const data = response.data;

        const trips:Array<Trip> = [];
        for(const tripDto of data) {
            trips.push(Trip.fromDto(tripDto))
        }

        this.cachedTrips = trips;

        return trips;
    }

    static async getTrip(id:number):Promise<Trip>{
        if (this.cachedTrips){
            const foundTrip =  this.cachedTrips.find(value => value.id === id);
            if (foundTrip){
                return foundTrip;
            }
        }

        const response = await AxiosService.instance.authenticatedClient.get(`/trip/${id}`);

        return Trip.fromDto(response.data);
    }
}
