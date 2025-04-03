<script setup>
import { verifyTOTPSecret } from "@/services/user";
import { ref, watch, onMounted } from "vue";
import { useUserStore } from "@/state/userStore";
import { useRouter } from "vue-router";
import { useAlertStore } from "@/state/alertStore";
import { check2FaVerification } from "@/services/user";

const alertStore = useAlertStore();
const router = useRouter()
const userStore = useUserStore();
var userId = userStore.userId;
let message = ref("")
let otp = ref("");

watch(otp, (newValue) => {
  otp.value = otp.value.replace(/\D/g, '');
  console.log(newValue);
  if (newValue.toString().length > 6) {
    otp.value = otp.value.toString().slice(0, 6);
    return;
  }
})

const checkVerification = async () => {

  const response = await check2FaVerification();
  if (response) {
    console.log(response);
    alertStore.triggerAlert({
      message: "Your TwoFA verification is still valid!",
      type: "success",
    })
    router.push({ name: "home" })
  }
}

onMounted(()=>{
  checkVerification();
})
const verifyTOTP = async (userOtp) => {
  try {
    console.log(userOtp);
    console.log(userOtp.toString().length);

    if (userOtp.toString().length !== 6) {
      message.value = "OTP must be a 6-digit number.";
    }
    else {
      message.value = "";
      const response = await verifyTOTPSecret({ userOtp, userId });
      if (response.status == 200) {
        alertStore.triggerAlert({
          message: "Verification Successfull",
          type: "success",
        })
        // alert("Verification Successfull ")
        router.push({ name: "home" })
      }
    }
  } catch (error) {
    if (error.status == 401) {
      message.value = "User has not set up 2FA!";
      console.log("User has not set up 2FA!");
      router.push({ name: "twoFA" })
    } else {
      console.log(error);
      message.value = error.response.data.message;
    }
  }
}

const goback = () => {
  router.push({ name: "twoFA" })
}
</script>
<!-- bg-[#eaeaea] -->
<template>
  <div class="h-screen p-4 w-screen text-black flex items-center justify-center">
    <div
      class="bg-white/50 rounded-2xl p-4 flex flex-col items-center gap-4 shadow-xl backdrop-md border border-gray-400 max-w-[450px]">
      <h2 class="w-full text-center text-xl font-bold border-b border-gray-400">
        Verify Two-Factor Authentication
      </h2>
      <div class="flex flex-col items-center gap-2">
        <div class="flex flex-col items-center gap-4">
          <p class="w-[-webkit-fill-available]">
            Enter the Time-based one-time password (TOTP) displayed in your
            authenticator app:
          </p>
          <input type="text" v-model="otp" placeholder="Ex: 425630"
            class="border border-gray-500 active:outline outline-blue-500 shadow-md rounded-full p-2 w-full text-center" />
          <p class="w-full text-left text-red-600" v-if="message">{{ message }}</p>
        </div>
        <div class="w-full flex justify-end gap-4">
          <!-- <button 
         class="rounded-full hover:bg-[#555] hover:text-white  text-black bg-gray border border-gray-400 px-4 py-2"
         @click="goback()"
         >
        Go back
        </button> -->
          <button @click="verifyTOTP(otp)"
            class="rounded-full hover:bg-[#555] hover:text-white active:bg-black hover:text-black hover:border border-gray-400 bg-blue-600 text-white px-4 py-2"
            type="submit">
            Verify
          </button>
        </div>
      </div>
    </div>
    <!-- <div class="">
      <img
      class="rounded-xl border border-red-600"
      src="/cover_password_manager.png" 
      alt=""
      />

    </div> -->
  </div>
</template>

<style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* For Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
