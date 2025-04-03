<script setup>
import { sharePassword } from "@/services/share";
import { useAlertStore } from "@/state/alertStore";
const alertStore = useAlertStore();

import { ref, defineProps } from "vue";
const permissionSelected = ref('view');

const props = defineProps({
  passwordId: {
    type: String,
    required: true,
  },
  receiverId: {
    type: String,
    required: true,
  },
  receiverName: {
    type: String,
    required: true,
  },
  site: {
    type: String,
    required: true,
  },
  cancelShare: {
    type: Function,
    required: true,
  },
});

const handleSend = async () => {
  console.log();
  try {
    const details = {
      passwordId: props.passwordId,
      sharedWithId: props.receiverId,
      permission: permissionSelected.value,
    };
    console.log("Details", details);
    
    const response = await sharePassword(details);
    if (response && response.data) {
      console.log("Password shared successfully");
      console.log(response);
      // alert("Password shared successfully");
      alertStore.triggerAlert({
        message: "Password shared successfully",
        type: "success",
      })
      props.cancelShare();
    }
  } catch (error) {
    if (error.status == 400) {
      console.log("This user already have access to this password", error);
      alertStore.triggerAlert({
        message: error.response?.data.message || "This user already have access to this password",
        type: "error",
      })
      props.cancelShare();
    } else {
      alertStore.triggerAlert({
        message: error.response?.data.message,
        type: "error",
      })
      console.log("Error occurred during password sharing:", error);
    }
  }
};

</script>

<template>
  <div class="flex items-center justify-center bg-black/40 w-screen h-screen">
    <div
      class="absolute bg-blue-50 p-4 flex flex-col items-center gap-2 border border-gray shadow-md backdrop-md rounded-2xl overflow-hidden max-w-[700px]"
    >
      <h2 class="font-semibold text-lg break-words">
        Do you really want to share your
        <span class="font-bold text-green-800 text-wrap break-all">{{
          props.site
        }}</span>
        password with
        <span class="font-bold text-green-800">{{ receiverName }}</span
        >?
      </h2>
      <div class="flex gap-2 w-full justify-start items-center">
        <p>Please choose password access permission</p>
        <!-- How do you want them to access? -->
        <select
          class="border border-gray-400 rounded-full p-2 bg-green-50"
          v-model="permissionSelected"
        >
          <option value="view">View</option>
          <option value="edit">Edit</option>
          <option value="full_access">Full Access</option>
        </select>
      </div>
      <div
        class="w-full flex justify-between gap-4 border-t border-gray-200 m-2 px-4 pt-4"
      >
        <button
          @click="props.cancelShare"
          class="rounded-full bge border border-black font-bold hover:text-red-800 text-black w-[100px]"
        >
          Cancel
        </button>
        <button
        @click="handleSend"
          class="p-2 rounded-full hover:bg-white bg-loginGreen border border-black font-bold text-white hover:text-green-800 w-[100px]"
        >
          Share
        </button>
      </div>
    </div>
  </div>
</template>
