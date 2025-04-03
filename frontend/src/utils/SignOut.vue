<script setup>
import router from '@/router/router';
import { signOutUser } from '@/services/user';
import { useAlertStore } from '@/state/alertStore';

const alertStore = useAlertStore();
const handleSignout = async () => {
  const response = await signOutUser();
  if (response.status == 200) {
    alertStore.triggerAlert({
      message: "User logged out successfully",
      type: "success"
    });
    // alert("User logged out successfully");
    router.push({ name: "login" });
  }
};
</script>

<template>
    <div class="absolute w-full h-full flex items-center justify-center z-[100] bg-black/30">
    <div class="container bg-black/80 text-white w-[350px] rounded-[35px] p-4 flex flex-col justify-center items-center gap-4 border border-gray-400 shadow-[0_0_30px_10px_rgba(25,25,25,0.8)]  backdrop-blur-lg hover:shadow-[0_0_30px_10px_rgba(255,255,255,0.8)] transition-shadow duration-300 ">
        <div class="text-base px-4 text-center flex flex-col gap-4">
          
          <p class="text-center font-bold text-3xl font-[aptos] text-red-500 w-full border-b border-gray-600">Sign out?</p> 
          <p> Do you really want to sign out? </p>
        </div>
        <div class="w-full gap-6 flex items-center justify-center ">
            <button 
            @click="$emit('close')"
            class="px-8 py-2 bg-green-600 rounded-full hover:bg-white hover:text-green-600">No</button>
            <button 
            @click="handleSignout"
            class="px-8 py-2 bg-red-600 rounded-full hover:bg-white hover:text-red-600">Yes</button>
        </div>
    </div>
</div>
</template>