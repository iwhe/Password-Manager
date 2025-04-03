<script setup>
import { loginUser } from "@/services/user";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/state/userStore.js";
import { useAlertStore } from "@/state/alertStore";
const userStore = useUserStore();
const alertStore = useAlertStore();
const router = useRouter();

const showPassword = ref(false);
const form = reactive({
  email: "",
  password: "",
})

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const submitLogin = async () => {
 try {
   const login = await loginUser({
     email: form.email,
     password: form.password
   })
   console.log(login);
   
   if(login.status == 200){
    //  alert("User logged in successfully!!")
     console.log(login.data);
    alertStore.triggerAlert({
      message: `You are logged in successfully!! Welcome, ${login.data.data?.loggedinUser?.name}`, 
      type: "success",
    })
    
     const userId = login.data.data?.loggedinUser?._id;
     userStore.setUserId(userId);

     router.push({name: "verify twoFA"})
    //  router.push({name: "home"})
   } else if (login.status == 401){
    alertStore.triggerAlert({
      message: "Please enter correct credentials", 
      type: "error",
    })
    //  alert("Please enter correct credentials..");
   }
 } catch (error) {
  if(error.status == 401){
    alertStore.triggerAlert({
      message: "Please enter correct credentials", 
      type: "error",
    })
  // alert("Please enter correct credentials..");
} else{
  alertStore.triggerAlert({
      message: "Something went wrong", 
      type: "error",
    })
  console.log(error);
  
  // alert("Something went wrong..", error.message);
}
 }
  
}

</script>

<template>
  <div
    class="h-screen w-screen flex flex-col justify-center md:flex-row bg-loginVertical md:bg-login"
  >
    <header class="w-full p-4 my-8 text-white flex gap-4 md:flex-col justify-center items-center">
      <img 
      class="w-[75px] md:w-[150px]"
      src="../assets/images/Union.png">
      <h2 class="text-4xl md:text-6xl font-alfaSlab text-center">
        Password Manager
      </h2>
    </header>

    <main
      class="w-full h-full flex items-start md:items-center justify-center md:justify-start"
    >
      <div class="text-white flex flex-col justify-center items-center mt-4">
        <h2 class="text-3xl p-4 font-alfaSlab">Login</h2>
        <form
          @submit.prevent="submitLogin"
          class="bg-white/5 backdrop-blur-md shadow-lg flex flex-col justify-center items-center gap-4 p-8 rounded-2xl"
        >
          <div class="form-group flex flex-col w-full justify-between gap-2">
            <label for="email">Email</label>
            <input
              class="bg-gray-200 text-black w-full rounded-lg p-4 border border-white"
              type="email"
              id="email"
              placeholder="Enter your email"
              v-model="form.email"
              required
            />
          </div>
          <div class="form-group relative flex flex-col justify-between gap-2 pb-8 border-b border-white/10">
            <label for="password">Password</label>
            <input
              :type="showPassword ? 'text' : 'password'"
              class="bg-gray-200 text-black w-full rounded-lg p-4 pr-10 border border-white"
              placeholder="Enter your password"
              id="password"
              v-model="form.password"
              required
            />
            <div class="absolute right-4 bottom-12 text-gray-400">
              <i @click="togglePasswordVisibility" v-if="showPassword">
                <v-icon name="io-eye-off-outline" />
              </i>
              <i @click="togglePasswordVisibility" v-else>
                <v-icon name="io-eye-outline" />
              </i>
            </div>
          </div>
          <!-- <router-link :to="{ name: 'home' }" class="w-full"> -->
            <button
              class="w-full p-4 bg-buttonBlue hover:bg-brand text-white rounded-lg "
              type="submit"
            >
              Login
            </button>
          <!-- </router-link> -->
        </form>
        <div class="text-black mt-8">Don't have an account? 
          <router-link :to="{name: 'register'}">
          <span class="text-white hover:text-blue-500">Register now</span>
        </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped></style>
