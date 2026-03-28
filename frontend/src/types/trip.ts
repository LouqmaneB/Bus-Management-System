import { type Route } from "./route";
import { type Bus } from "./bus";

export type Trip = {
  _id: string;
  route: Route;
  bus: Bus;
  serviceDate: string;
  startTime: string;
  endTime: string;
  tripDurationMinutes: number;
  breakMinutes: number;
  status: "planned" | "active" | "cancelled";
  createdAt: string;
  updatedAt: string;
}