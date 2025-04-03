import "./assets/main.css";
import router from "./router/router.js";
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faCaretRight,
  faArrowLeftLong,
  //   faCopy,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
library.add(faCaretRight, faArrowLeftLong, faEye);

import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  IoEyeOutline,
  IoEyeOffOutline,
  MdContentcopyRound,
  IoCloseOutline,
  CoAccountLogout,
  IoShare,
  FaRegularEdit,
  MdDelete,
  MdDoneTwotone,
  MdError,
} from "oh-vue-icons/icons";

addIcons(
  IoCloseOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  MdContentcopyRound,
  CoAccountLogout,
  IoShare,
  FaRegularEdit,
  MdDelete,
  MdDoneTwotone,
  MdError
);

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("v-icon", OhVueIcon);
app.mount("#app");
