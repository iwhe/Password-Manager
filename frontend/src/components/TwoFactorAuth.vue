<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { getTOTPSecret } from "@/services/user";
import { useUserStore } from "@/state/userStore.js";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const userStore = useUserStore();
const userId = userStore.userId;
console.log("User Id for two fa::", userId);

// Re``active references
const qrCode = ref(null);
const secret = ref(null);
const name = ref('');
const token = ref("");
const errorMessage = ref("");
const loading = ref(true);


// Fetch the QR code and secret from the backend
const fetchQrCode = async () => {
  try {
    const response = await getTOTPSecret(userId);
    qrCode.value = response.data.data.qr;
    name.value = response.data.data.name;
    secret.value = response.data.data.secret.base32;
  } catch (error) {
    console.error("Error fetching QR code:", error);
    errorMessage.value =
      `Failed while generating authentication secret. Please ensure that you have registered yourself before navigating to this page.`;
  } finally {
    loading.value = false;
  }
};

// Verify the TOTP token
// const verifyToken = async () => {
//   try {
//     const response = await axios.post("/api/2fa/verify", {
//       token: token.value,
//       secret: secret.value, // Ideally, handle the secret on the backend
//     });
//     if (response.status === 200) {
//       message.value = "2FA setup verified successfully!";
//     } else {
//       message.value = "Invalid code. Please try again.";
//     }
//   } catch (error) {
//     console.error("Verification error:", error);
//     message.value = "An error occurred. Please try again.";
//   }
// };

const cancel2FA = async () => {
  router.push({ name: "register" });
};
const verify2FA = async () => {
  router.push({ name: "verify twoFA" });
};

// Fetch QR code on component mount
onMounted(fetchQrCode);
</script>

<template>
  <div class="p-4 bg-[#eaeaea] text-black h-screen w-screen flex flex-col justify-center items-center">
    <div v-if="errorMessage" 
    class="text-justify text-xl font-normal "
    >
    <p class="text-center font-medium text-3xl"> :( </p>
      {{ errorMessage }}
      <p @click="cancel2FA" class="text-blue-500 font-semibold cursor-pointer text-center hover:underline decoration-black">Navigate to register</p>
    </div>
    <div 
    v-else
    class="p-4 bg-[#fafafa] border border-gray-400 rounded-2xl flex flex-col items-center gap-4 shadow-2xl">
      <h2 class="w-full text-center font-bold text-lg md:text-xl border-b border-gray-200">
        Set up Two-Factor Authentication
      </h2>
      <p v-if="loading">Loading...</p>
      <div v-else-if="secret" class="relative w-full flex flex-col justify-center gap-4 items-center">
        <div class="QR-code flex flex-col items-center text-center gap-2">
          <p class="flex flex-col"> <span class="font-semibold text-xl text-blue-500">Hi! {{name}},</span> Scan the QR code below with your authenticator app:</p>
          <img class="w-[150px] md:w-[200px] border-2 border-blue-200 rounded-2xl" v-if="qrCode" :src="qrCode"
            alt="QR Code" />
        </div>
        <div>
          <p class="relative flex flex-col text-center">
            Or manually enter this key:
            <strong class="text-xs md:text-sm max-w-[300px] md:max-w-[600px] break-words">{{ secret }}</strong>
          </p>
        </div>
        <div class="action-buttons mt-4 w-full flex items-center gap-2 justify-end">
          <button @click="cancel2FA()" class="py-2 px-8 border border-gray rounded-full hover:bg-gray">
            Cancel
          </button>
          <button @click="verify2FA()"
            class="py-2 px-8 border border-gray rounded-full text-white bg-blue-500 hover:bg-blue-700">
            Enter TOTP
          </button>
        </div>
        <p class="text-red-700" v-if="message">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
