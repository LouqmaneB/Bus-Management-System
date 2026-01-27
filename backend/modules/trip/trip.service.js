import { TripPlan, TripRun } from "../models/trip.model.js";

/**
 * Create a trip plan and generate trip runs
 */
export default class StopServices {
  async createTripPlanService(data) {
    const {
      route,
      bus,
      serviceDate,
      startTime,
      endTime,
      tripDurationMinutes,
      breakMinutes,
      status,
    } = data;

    const tripPlan = await TripPlan.create({
      route,
      bus,
      serviceDate,
      startTime,
      endTime,
      tripDurationMinutes,
      breakMinutes,
      status,
    });

    let currentTime = startTime;
    const tripRuns = [];

    while (currentTime < endTime) {
      const [hours, minutes] = currentTime.split(":").map(Number);
      const startMinutes = hours * 60 + minutes;
      const runEndMinutes = startMinutes + tripDurationMinutes;

      const runEndHours = Math.floor(runEndMinutes / 60);
      const runEndMins = runEndMinutes % 60;
      const runEndTime = `${String(runEndHours).padStart(2, "0")}:${String(runEndMins).padStart(2, "0")}`;

      if (runEndTime > endTime) break;

      tripRuns.push({
        tripPlan: tripPlan._id,
        startTime: currentTime,
        endTime: runEndTime,
      });

      const nextStartMinutes = runEndMinutes + breakMinutes;
      const nextHours = Math.floor(nextStartMinutes / 60);
      const nextMins = nextStartMinutes % 60;
      currentTime = `${String(nextHours).padStart(2, "0")}:${String(nextMins).padStart(2, "0")}`;
    }

    await TripRun.insertMany(tripRuns);

    return { tripPlan, generatedTrips: tripRuns.length };
  }

  /**
   * Get all trip plans
   */
  async getTripPlansService() {
    const tripPlans = await TripPlan.find()
      .populate("route")
      .populate("bus")
      .sort({ serviceDate: 1 });
    return { tripPlans, count: tripPlans.length };
  }

  /**
   * Get all trip runs, optionally filter by date
   */
  async getTripRunsService(date) {
    const filter = {};
    if (date) filter.startTime = { $regex: `^${date}` };

    const trips = await TripRun.find(filter)
      .populate({
        path: "tripPlan",
        populate: ["route", "bus"],
      })
      .populate("driverShifts.driver")
      .sort({ startTime: 1 });

    return { trips, count: trips.length };
  }
}
