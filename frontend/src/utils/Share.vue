<script setup>
import { searchUser } from "@/services/user";
import { sharePassword } from "@/services/share";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useAlertStore } from "@/state/alertStore";
import ConfirmShare from "@/components/ConfirmShare.vue";
const route = useRoute();
const alertStore = useAlertStore();
const passwordId = route.params.id;
const userEmail = ref("");
const foundUser = ref(null);
const errorMsg = ref(null);
const confirmPopup = ref(false);

const props = defineProps({
  onClose: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits(['receiverDetails']);

const handleSearch = async (user) => {
  try {
    if (user.trim() == "") {
      foundUser.value = null;
      errorMsg.value = "Please enter a valid email";
    } else {
      const response = await searchUser({ email: user });

      if (response && response.data && response.data.data) {
        console.log("Response:", response);
        foundUser.value = response.data.data;
        errorMsg.value = "";
      } else {
        console.error("User not found or invalid response structure.");
        //   userNotFound.value = true;
        errorMsg.value = "User not found !!";
        foundUser.value = null;
      }
    }
  } catch (error) {
    console.error("Error occurred during user search:", error);
    errorMsg.value = "User not found !!";
    foundUser.value = null;
  }
};

// const handleSend = async (shareWith) => {
//   console.log(shareWith);
//   // console.log("Password", passwordId);
//   try {
//     const details = {
//       passwordId: passwordId,
//       sharedWithId: shareWith,
//       permission: "View",
//     };
//     const response = await sharePassword(details);
//     if (response && response.data) {
//       console.log("Password shared successfully");
//       console.log(response);
//       // alert("Password shared successfully");
//       alertStore.triggerAlert({
//         message: "Password shared successfully",
//         type: "success",
//       })
//       props.onClose();
//     }
//   } catch (error) {
//     if (error.status == 400) {
//       console.log("This user already have access to this password", error);
//       alertStore.triggerAlert({
//         message: error.response?.data.message || "This user already have access to this password",
//         type: "error",
//       })
//     } else {
//       console.log("Error occurred during password sharing:", error);
//     }
//   }
// };

const handleSend = async (receiverId, receiverName) => {
  console.log(receiverId, receiverName);
  // console.log("Password", passwordId);
  try {
    emit('receiverDetails', 
    {
     receiverId: receiverId,
     receiverName: receiverName
    })
  } catch (error) {
      console.log("Error while send recievers detail using emit.", error);
      alertStore.triggerAlert({
        message: error.response?.data.message,
        type: "error",
      })
  }
};

</script>

<template>
  <div class="fixed top-10 ">
    <div
      class="relative bg-white w-[400px] min-h-[150px] border border-gray-200 rounded-2xl flex flex-col gap-4 items-center shadow-[0_0_5px_0px_rgba(25,25,25,0.8)] backdrop-blur-lg"
    >
    <div class="fixed w-auto p-4 ">
      <div class="flex items-center w-full ">
      <h2
        class="text-xl font-bold text-blue-500 w-full text-center border-b border-gray-400"
      >
        Share Password
      </h2>
      <v-icon
        @click="props.onClose"
        class="absolute right-[15px] rounded-full hover:bg-gray"
        name="io-close-outline"
      />
    </div>
      <form
        @submit.prevent="handleSearch(userEmail)"
        class="flex flex-col gap-2 items-start w-full"
      >
        <label>Who do you like to share with?</label>
        <div class="flex flex-row w-full gap-2">
          <input
            v-model="userEmail"
            class="p-2 bg-gray border border-gray-400 rounded-full w-full"
            type="text"
            placeholder="Enter Email"
          />
          <button
            class="bg-gray text-black font-bold hover:bg-blue-500 hover:text-white rounded-full p-2"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
    </div>
    <div class="pt-[150px] p-4 w-full ">
      <div v-if="foundUser" class=" border-t border-black/10 flex flex-col items-center w-full gap-2 max-h-[600px] overflow-y-scroll">
        <h2 class="font-bold text-md text-zinc-700">User found:</h2>
        <div
          v-for="user in foundUser"
          class="w-full flex flex-row justify-between bg-gray py-2 px-4 rounded-full"
        >
          <div class="text-sm text-black flex flex-col">
            <p class="font-bold">{{ user.name }}</p>
            <p class="text-sm text-gray-600">{{ user.email }}</p>
          </div>
          <button
            @click="handleSend(user?._id, user?.name)"
            class="py-2 px-4 bg-white text-black border border-blue-600 font-bold rounded-full hover:bg-blue-600 hover:text-white focus:bg-black"
          >
            Share
          </button>
        </div>
      </div>
      <div 
      class="border-t border-red-200 text-center"
      v-if="errorMsg">
        <p class="text-sm text-red-500">{{ errorMsg }}</p>
        <!-- <p>{{ notFoundMsg }}</p> -->
      </div>
    </div>
    </div>
  </div>
  
</template>
