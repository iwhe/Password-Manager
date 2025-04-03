import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import Home from "../pages/Home.vue";
import ViewPassword from "@/pages/ViewPassword.vue";
import Register from "../pages/Register.vue";
import EditPassword from "@/pages/EditPassword.vue";
import CreatePassword from "@/pages/CreatePassword.vue";
import SharedPassword from "@/components/SharedPassword.vue";
import ViewSharedPassword from "@/components/ViewSharedPassword.vue";
import Share from "@/utils/Share.vue";
import TwoFactorAuth from "@/components/TwoFactorAuth.vue";
import Verify2FA from "@/components/Verify2FA.vue";
// import ConfirmShare from "@/components/ConfirmShare.vue";
// import Skeleton from "@/utils/skeleton/home.vue";
// import Admin from "@/components/admin.vue";
import Unauthorized from "@/pages/Unauthorized.vue";

const routes = [
  { name: "home", path: "/", component: Home },
  { name: "login", path: "/login", component: Login },
  { name: "register", path: "/register", component: Register, props: true },
  { name: "see password", path: "/see-password/:id", component: ViewPassword },
  {
    name: "view shared password",
    path: "/shared-password/:id",
    component: ViewSharedPassword,
  },
  {
    name: "shared password",
    path: "/shared-passwords",
    component: SharedPassword,
  },
  {
    name: "create password",
    path: "/create-password",
    component: CreatePassword,
  },
  {
    name: "edit password",
    path: "/edit-password/:id",
    component: EditPassword,
  },
  { name: "share", path: "/share", component: Share },
  { name: "twoFA", path: "/2fa", component: TwoFactorAuth },
  {
    name: "verify twoFA",
    path: "/2fa/verify",
    component: Verify2FA,
    props: true,
  },
  {
    name: "unauthorized",
    path: "/unauthorized",
    component: Unauthorized,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
