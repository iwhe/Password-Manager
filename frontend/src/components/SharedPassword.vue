<script setup>
import { sharedPasswordList } from "@/services/share";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const sharedPassword = ref(null);
const errorMsg = ref("");

const getSharedPassword = async () => {
  try {
    const response = await sharedPasswordList();
    if (response) {
      sharedPassword.value = response.data;
      console.log("Shared password reponse:", response);
    }
  } catch (error) {
    if (error.status == 404) {
      errorMsg.value = "You do not have any passwords shared.";
    } else {
      errorMsg.value = "Something went wrong while fetching shared password";
    }
    // console.log(errorMsg);
  }
};

onMounted(() => {
  getSharedPassword();
});

const opensharedPassword = async (id) =>{
  // console.log("clicked! sharedid", sharedId);
  router.push({name: "view shared password", params: { id } })
  
}
</script>

<template>
  <div>
    <div
      v-if="sharedPassword"
    >
      <ul v-for="password in sharedPassword">
        
        <li 
        @click="opensharedPassword(password?.sharedId)"
        class="relative border-box contain flex flex-row justify-between gap-2 items-center p-2 border-b border-gray-300 hover:bg-gray cursor-pointer">
          <div
            class="logo w-12 min-w-12 overflow-hidden border border-gray-200 rounded-xl"
          >
            <img src="/password.jpg" alt="logo" />
          </div>
          <h2 class="w-full text-left">{{ password.sitename }}</h2>
          <!-- <div class="w-full text-left text-gray-600">
            <p class="font-[550] truncate">{{ password.ownerName }}</p>
            <p class="w-full text-left truncate">{{ password.ownerEmail }}</p>
          </div> -->
          <p class="w-full text-left">{{ password.permission }}</p>
          <div class="arrow text-black">
            <font-awesome-icon :icon="['fas', 'caret-right']" />
          </div>
        </li>
      </ul>
    </div>

    <div v-if="errorMsg">
      <p class="text-red-700">{{ errorMsg }}</p>
    </div>
  </div>
</template>
