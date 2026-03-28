import { TripPlan, TripRun } from "./trip.model.js";

/**
 * Create a trip plan and generate trip runs
 */
export default class StopServices {
  async createTripPlanService(data) {
    const {
      route,
      bus,
      startDate,
      endDate,
      daysOfTheWeek,
      serviceStartTime,
      serviceEndTime,
      tripDurationMinutes,
      breakMinutes = 0,
      status,
    } = data;

    if (!daysOfTheWeek?.length) {
      const error = new Error("At least one day of the week must be selected");
      error.statusCode = 400;
      throw error;
    }

    const toMinutes = (t) => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m;
    };

    const toTimeString = (mins) => {
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    };

    const plans = [];
    const runs = [];

    let currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    while (currentDate <= lastDate) {
      const weekday = currentDate.getDay();

      if (daysOfTheWeek.includes(weekday)) {
        const tripPlan = await TripPlan.create({
          route,
          bus,
          serviceDate: currentDate,
          startTime: serviceStartTime,
          endTime: serviceEndTime,
          tripDurationMinutes,
          breakMinutes,
          status,
        });

        plans.push(tripPlan);

        let currentMinutes = toMinutes(serviceStartTime);
        const endMinutes = toMinutes(serviceEndTime);

        while (currentMinutes + tripDurationMinutes <= endMinutes) {
          const runEndMinutes = currentMinutes + tripDurationMinutes;

          runs.push({
            tripPlan: tripPlan._id,
            startTime: toTimeString(currentMinutes),
            endTime: toTimeString(runEndMinutes),
          });

          currentMinutes = runEndMinutes + breakMinutes;
        }
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    if (runs.length) {
      await TripRun.insertMany(runs);
    }

    return {
      tripPlansCreated: plans.length,
      tripRunsCreated: runs.length,
    };
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
   * Get a trip plan by id
   */
async getTripPlanService(id) {
  const tripPlan = await TripPlan.findById(id)
    .populate("route")
    .populate("bus")
    .populate({
      path: "route",
      populate: {
        path: "stops.stopId",
        model: "Stop",
      },
    });

  if (!tripPlan) {
    throw new Error("Trip plan not found");
  }

  return { tripPlan };
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

  /**
   * Delete a trip run
   */
  async deleteTripRun(id) {
    const trip = await TripRun.findByIdAndUpdate(
      id,
      { canceled: true },
      { new: true },
    );

    if (!trip) {
      throw new Error("Trip not found");
    }

    return { trip };
  }

  /**
   * Delete a trip plan
   */
  async deleteTripPlan(id) {
    const tripPlan = await TripPlan.findByIdAndDelete(id);
    if (!tripPlan) {
      throw new Error("Trip not found");
    }
    await TripRun.deleteMany({ tripPlan: id });
    return { tripPlan };
  }
}
