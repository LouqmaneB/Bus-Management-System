export type Stop = {
  stopId: {
    location: {
      coordinates: [number, number];
    };
    id: string;
    stop_name: string;
    description: string;
    facilities: {
      shelter: boolean;
      bench: boolean;
      lighting: boolean;
      wheelchair_accessible: boolean;
      real_time_display: boolean;
    };
  };
  order: number;
};