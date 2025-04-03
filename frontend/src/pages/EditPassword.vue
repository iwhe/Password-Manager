<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { viewPassword, updatePassword } from '@/services/password';
import { useAlertStore } from '@/state/alertStore';
import Skeleton from "@/utils/skeleton/home.vue"

const alertStore = useAlertStore();
const route = useRoute();
const id = route.params.id;
const router = useRouter();
const loading = ref(false);

// const password = ref('');
const passwordDetail = ref({
  site: "",
  siteEmail: "",
  password: "",
  notes: ""
})
const showPassword = ref(false);
const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
}

const getPasswordDetail = async(id) => {
  try {
    loading.value == true
    const response = await viewPassword(id);
    console.log(response);
    passwordDetail.value = response.data.data;
    console.log("Password details", passwordDetail.value);
  } catch (error) {
    loading.value == true
    alertStore.triggerAlert({
        message: error.response.data.message,
        type: "error",
    })
    if(error.status == 401)
    router.push({
      name: "unauthorized"
    })
    console.error("Error fetching password details:", error);
  } finally{
    loading.value == false
  }
}

onMounted(()=>{
  getPasswordDetail(id);
})


const handleEditPassword = async(id, passwordDetail) => {
    try {
      const response = await updatePassword(id, passwordDetail);
      if(response.status == 200){
        // alert("Password updated successfully!")
        alertStore.triggerAlert({
          message: "Password updated successfully!",
          type: "success",
        })
        router.back({id})
        // router.push({name: "see password", params: {id}})
      }
      console.log(response);
    } catch (error) {
      alertStore.triggerAlert({
        message: error.response.data.message,
        type: "error",
      })
      console.log(error.response.data.message);
      
    }
}

const cancel = () => {
  router.push({name: "see password", params: {id}})
  router.back({id})
}

const goback = () => {
  if (router) {
        router.back();
      }
}

</script>

<template>
  <div class="text-black flex flex-col justify-center items-center p-8">
    <div 
    class="container">
      <div class="flex gap-8 items-center">
        <!-- <router-link :to="{ name: 'see password', params: id}"> -->
          <font-awesome-icon
          @click="goback()"
            :icon="['fas', 'arrow-left-long']"
            class="rounded-full hover:bg-gray p-4 text-2xl"
          />
        <!-- </router-link> -->

        <h2 class="text-2xl capitalize">Edit password</h2>
      </div>
      <Skeleton v-if="loading" />
      <div 
      v-if="passwordDetail.value"
      class="flex justify-center mt-8">
        <div
          class="flex flex-col gap-4 content shadow-md rounded-xl border border-gray-200 p-8 w-[600px]"
        >
          <div class="site">
            <h2>Site</h2>
            <input
              v-model="passwordDetail.site"
              class="bg-gray rounded-md p-4 border border-white w-full"
              type="text"
            />
          </div>
          <div class="userName relative">
            <h2>User Name</h2>
            <input
            v-model="passwordDetail.siteEmail"
              class="bg-gray rounded-md p-4 border border-white w-full"
              type="text"
            />
          </div>
          <div class="password relative">
            <h2>Password</h2>
            <input
            v-model="passwordDetail.password"
              class="bg-gray rounded-md p-4 border border-white w-full"
              :type="showPassword ? 'text' : 'password'"
            />
            <!-- <font-awesome-icon icon="fa-regular fa-eye" /> -->
            <div class="icons absolute top-[40px] right-[5px]">
              <i 
              @click="togglePasswordVisibility"
              v-if="showPassword"
                class="p-2 rounded-full hover:text-gray-400 cursor-pointer"
                ><v-icon name="io-eye-off-outline"
              /></i>
              <i @click="togglePasswordVisibility" 
              v-else  
              class="p-2 rounded-full hover:text-gray-400 cursor-pointer"
                ><v-icon name="io-eye-outline"
              /></i>
            </div>
            <!-- IoEyeOffOutline -->
            <!-- <font-awesome-icon icon="fa-regular fa-eye" />
                <font-awesome-icon :icon="['far', 'copy']" /> -->
          </div>

          <div class="notes">
            <h2>Note (Optional)</h2>
            <input
              v-model="passwordDetail.notes"
              class="bg-gray rounded-md p-4 border border-white w-full"
              type="text"
            />
          </div>

          <div class="actionButtons flex flex-row justify-end gap-4 py-2">
            <button
            @click="handleEditPassword(id, passwordDetail)"
              class="p-4 rounded-xl bg-loginGreen hover:bg-black text-white w-[100px]"
            >
              Save 
            </button>
            <button
            @click="cancel"
              class="p-4 rounded-xl bg-brand hover:bg-black text-white w-[100px]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
