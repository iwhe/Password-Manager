<script setup>
import SignOut from './SignOut.vue';
import { ref } from 'vue';
const showSignout = ref(false);

const props = defineProps({
    user: {
        type: Object,
        required: true,
    },
    onClose: {
        type: Function,
        required: true,
    }
}) 
</script>


<template>
    <div
      class="absolute z-[10] right-3 top-4 bg-[#282a2c] py-8 px-4 text-[#c4c7c5] min-w-[300px] max-w-[436px] p-[8px 12px 16px] shadow-[0_4px_8px_3px_rgba(0,0,0,.15),0_1px_3px_rgba(0,0,0,.3)] rounded-3xl flex flex-col items-center"
    >
      <div>
        <h2
          class="font-serif text-blue-600 font-bold uppercase text-xl mb-6 underline"
        >
          Profile
        </h2>
        <div
          class="absolute right-6 top-6 rounded-full text-2xl"
          @click="props.onClose"
        >
        <v-icon 
        class="bg-white rounded-full hover:bg-red-600"
        name="io-close-outline" />
        
    </div>
      </div>
      <div
        class="text-center font-['Google Sans','Roboto'] text-[.875rem] transition-[opacity .15s cubic-bezier(.4,0,.2,1)]"
      >
        {{ user.email }}
      </div>
      <div class="relative w-[80px] h-[80px] mt-[22px] rounded-full">
        <div
          class="absolute inset-0 rounded-full border-[0.5px] border-transparent animate-spin-slow"
          style="background: linear-gradient(green, red, red, green)"
        ></div>
        <div class="absolute inset-0 p-[2px] rounded-full">
          <img
            src="../assets/images/profile.jpg"
            alt="profile"
            class="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
      <div
        class="capitalize font-[400] font-['Google Sans','Roboto'] text-[1.375rem] my-5 text-center"
      >
        {{ user.name }}
      </div>
      <button
        @click="showSignout = true"
        class="w-full bg-black hover:bg-red-600 text-[#e3e3e3] rounded-full p-[17px] flex flex-row justify-center items-center text-md gap-4"
      >
        <i><v-icon 
        name="co-account-logout" /></i>
        Log out
      </button>
    </div>
    <SignOut 
      class="absolute "
      v-if="showSignout" @close="showSignout = false" />

    
  </template>
  