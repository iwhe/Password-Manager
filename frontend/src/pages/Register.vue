<script setup>
import { registerUser } from "@/services/user";
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import TwoFactorAuth from "@/components/TwoFactorAuth.vue";
import Success from "@/utils/Success.vue";
import Error from "@/utils/AlertContainer.vue";
import { useUserStore } from "@/state/userStore.js";
import { useAlertStore } from "@/state/alertStore";
const alertStore = useAlertStore();
const userStore = useUserStore();
const router = useRouter();


const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const errorConfirmPassword = ref("");
const sucessMessage = ref("");
const errorMessage = ref("");

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const passwordsMatch = computed(() => {
  return (
    password.value === confirmPassword.value || confirmPassword.value === ""
  );
});

watch(confirmPassword, (newVal) => {
  if (newVal !== password.value) {
    errorConfirmPassword.value = "Please enter same password again";
  } else {
    errorConfirmPassword.value = "";
  }
});

const submitRegister = async () => {
  try {
    if (passwordsMatch.value) {
    const register = await registerUser({
      name: name.value,
      email: email.value,
      password: password.value,
    });
    if(register.status == 200){
      alertStore.triggerAlert({
        message: 'Registration successful!',
        type: 'success',
      });
           // sucessMessage.value = "User registered successfully!!";
           // if(sucessMessage){
           //   console.log("successmessage", sucessMessage.value);
        
          // }
          // alert("User registered successfully!!")
          // console.log("Register::", register.data);
        const userId =  register.data.data._id;
          // console.log("asdasda", userId);
        
        userStore.setUserId(userId);
          // console.log("User id state set",userStore.userId);
        
        router.push({
           name: "twoFA",
          })
    } else{
      alertStore.triggerAlert({
        message: 'Registration unsuccessful!',
        type: 'error',
      });
      errorMessage.value = true;
    }
    
  }
  } catch (error) {
    alertStore.triggerAlert({
      message: error.response.data.message,
      type: 'error',
    })
  }
  
};

const onClose = (model) => {
  model.value = ""
}
</script>

<template>
  <div
    class="h-screen w-screen flex flex-col justify-center md:flex-row bg-loginGreen overflow-x-hidden"
  >
  <Success v-if="sucessMessage" :message="sucessMessage" :onClose = "() => onClose(sucessMessage)"/>
    <header
      class="w-full text-center text-red-300 my-8 flex justify-center items-center"
    >
      <h2 class="font-bold text-5xl md:text-6xl font-alfaSlab text-center">
        Password Manager
      </h2>
    </header>

    <main
      class="w-full h-full flex items-start md:items-center justify-center md:justify-start"
    >
      <div
        class="w-11/12 text-white flex flex-col justify-center items-center md:items-start md:mt-4"
      >
        <h2 class="text-3xl py-4 font-alfaSlab w-full sm:w-[400px] text-center">Register yourself here</h2>
        <form
          @submit.prevent="submitRegister"
          class="w-full sm:w-[400px] bg-white/5 backdrop-blur-md shadow-lg flex flex-col justify-center items-center gap-4 p-8 rounded-2xl"
        >
          <div class="form-group w-full flex flex-col justify-between gap-2">
            <label for="name">Full Name</label>
            <input
              class="text-black bg-gray-200 rounded-md p-2 border border-white"
              type="text"
              id="name"
              placeholder="Mac Smith"
              v-model="name"
              required
            />
          </div>
          <div class="form-group w-full flex flex-col justify-between gap-2">
            <label for="email">Email</label>
            <input
              class="text-black bg-gray-200 rounded-md p-2 border border-white"
              type="email"
              placeholder="macsmith@gmail.com"
              id="email"
              v-model="email"
              required
            />
          </div>
          <div
            class="form-group w-full relative flex flex-col justify-between gap-2"
          >
            <label for="password">Password</label>
            <input
              class="text-black bg-gray-200 rounded-md p-2 border border-white"
              id="password"
              placeholder="*******"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
            />
            <div class="absolute right-2 top-[40px] text-gray-400">
              <i @click="togglePasswordVisibility" v-if="showPassword">
                <v-icon name="io-eye-off-outline" />
              </i>
              <i @click="togglePasswordVisibility" v-else>
                <v-icon name="io-eye-outline" />
              </i>
            </div>
          </div>
          <div
            class="form-group w-full relative flex flex-col justify-between gap-2"
          >
            <label for="confirm password">Confirm Password</label>
            <input
              class="relative text-black bg-gray-200 rounded-md p-2 border border-white"
              id="confirmPassword"
              placeholder="*******"
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              required
            />
            <div class="absolute right-2 top-[40px] text-gray-400">
              <i @click="toggleConfirmPassword" v-if="showConfirmPassword">
                <v-icon name="io-eye-off-outline" />
              </i>
              <i @click="toggleConfirmPassword" v-else>
                <v-icon name="io-eye-outline" />
              </i>
            </div>
            <div
              v-if="errorConfirmPassword"
              class="error text-[#000000] font-[500] text-sm"
            >
              {{ errorConfirmPassword }}
            </div>
          </div>
          <!-- <router-link :to="{ name: 'login' }" class="w-full"> -->
          <button
            class="w-full p-4 bg-black hover:bg-brand text-white rounded-xl"
            type="submit"
          >
            Register
          </button>
          <!-- </router-link> -->
        </form>

        <div class="text-black md:mt-4 mx-12 ">Already have an account? 
          <router-link :to="{name: 'login'}">
          <span class="text-white hover:text-blue-500">Login here</span>
        </router-link>
        </div>
      </div>
    </main>

  </div>
 
</template>
