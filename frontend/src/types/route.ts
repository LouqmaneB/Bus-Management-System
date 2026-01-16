import { type Stop } from "./stop";


export type Route = {
  _id: string;
  routeNumber: string;
  routeName: string;
  routeColor: string;
  stops: Stop[];
  operatingHours: {
    start: string;
    end: string;
  };
};