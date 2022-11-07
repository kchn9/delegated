import axios from "axios";

export default {
  createTrip(country, startDate, endDate, userId) {
    return axios
      .post("/api/v1/trips", {
        country,
        startDate,
        endDate,
        userId,
      })
      .then((res) => res.data);
  },

  getTripDetails(id) {
    return axios.get(`/api/v1/trips/${id}`).then((res) => res.data);
  },
};
