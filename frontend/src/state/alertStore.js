import { defineStore } from "pinia";

export const useAlertStore = defineStore("alert", {
  state: () => ({
    alerts: [],
  }),
  actions: {
    triggerAlert({ message, type = "success", timeout = 5000 }) {
      const id = Date.now();
      this.alerts.push({ id, message, type });

      console.log("Alert triggered", { message, type, timeout });

      setTimeout(() => {
        this.clearAlert(id);
      }, timeout);
    },

    clearAlert(id) {
      this.alerts = this.alerts.filter((alert) => alert.id !== id);
    },
  },
});

// export const useAlertStore = defineStore("alert", {
//   state: () => ({
//     message: "",
//     type: "success",
//     timeout: 5000,
//     show: false,
//   }),
//   actions: {
//     triggerAlert({ message, type = "success", timeout = 5000 }) {
//       console.log("Alert triggerAlert", { message, type, timeout });

//       this.message = message;
//       this.type = type;
//       this.timeout = timeout;
//       this.show = true;

//       console.log("Alert store", { message, type, timeout });

//       setTimeout(() => {
//         this.clearAlert();
//       }, timeout);
//     },
//     clearAlert() {
//       this.show = false;
//       this.message = "";
//     },
//   },
// });
