<script setup>
import { savePassword } from "@/services/password";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import generatePassword from "@/services/generatePassword";
import { useAlertStore } from "@/state/alertStore";
const alertStore = useAlertStore();

// const password = ref("");
const showPassword = ref(true);

const form = reactive({
  site: "",
  userName: "",
  password: "",
  notes: ""
})

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const handleSavePassword = async () => {
  // console.log(form.site);
  try {
    const response = await savePassword({
      site: form.site,
      siteEmail: form.userName,
      password: form.password,
      notes: form.notes
    })
    if(response?.status == 200){
      // alert("Password saved successfully!!!")
      alertStore.triggerAlert({
        message: 'Password Created Successfully',
        type: 'success',
      });
      // ("",)
      router.push({name: "home"})
    }
  } catch (error) {
    // alert("Something went wrong while saving password", )
    alertStore.triggerAlert({
        message: error||error?.message,
        type: 'error',
      });
    console.log(error);
    
  }
  

}
const clearForm = () => {
  form.site = "",
    form.userName = "",
    form.password = "",
    form.notes = ""
}

const generateRandPassword = () => {
  const length = 16;
  const randPassword = generatePassword(length);
  form.password = randPassword;
  // console.log(randPassword);
  
}
</script>

<template>
  <div class="text-black flex flex-col justify-center items-center p-8">
    <div class="container">
      <div class="flex gap-8 items-center">
        <router-link :to="{ name: 'home' }">
          <font-awesome-icon :icon="['fas', 'arrow-left-long']" class="rounded-full hover:bg-gray-300 p-4 text-2xl" />
        </router-link>

        <h2 class="text-2xl capitalize">Store your password</h2>
      </div>

      <div class="flex justify-center mt-8">
        <form @submit.prevent="handleSavePassword"
        @keypress.enter="handleSavePassword"
          class="flex flex-col gap-4 content shadow-md rounded-xl border border-gray-200 p-8 w-[600px]">
          <div class="site">
            <h2>Site <span class="text-red-500">*</span></h2>
            <input v-model="form.site" class="bg-gray rounded-md p-4 border border-white w-full" type="text"
              placeholder="Enter site URL here" required />
          </div>
          <div class="userName relative">
            <h2>User Name <span class="text-red-500">*</span></h2>
            <input v-model="form.userName" class="bg-gray rounded-md p-4 border border-white w-full" type="text"
              placeholder="Enter your email or username" required />
            <!-- <i
              @click="copyToClipboard(name)"
              class="absolute top-[30px] right-[5px] p-2 rounded-full cursor-pointer hover:text-gray-400"
              ><v-icon name="md-contentcopy-round"
            /></i> -->
          </div>
          <div class="password relative">
            <div class="flex flex-row justify-between"><h2>Password <span class="text-red-500">*</span></h2>
            <h2 
            @click="generateRandPassword()"
            class=" text-blue-600 bg-gray hover:text-white px-2 hover:bg-green-900 rounded-full  cursor-pointer">Generate Random Password</h2>
          </div>
            <input v-model="form.password" class="bg-gray rounded-md p-4 border border-white w-full"
              :type="showPassword ? 'text' : 'password'" placeholder="Password" required />
            <!-- <font-awesome-icon icon="fa-regular fa-eye" /> -->
            <div class="icons">
              <i @click="togglePasswordVisibility" v-if="showPassword"
                class="absolute top-[30px] right-[5px] p-2 rounded-full hover:text-gray-400 cursor-pointer"><v-icon
                  name="io-eye-off-outline" /></i>
              <i @click="togglePasswordVisibility" v-else
                class="absolute top-[30px] right-[5px] p-2 rounded-full hover:text-gray-400 cursor-pointer"><v-icon
                  name="io-eye-outline" /></i>
              <!-- <i
                @click="copyToClipboard(password)"
                class="absolute top-[30px] right-[5px] p-2 rounded-full cursor-pointer hover:text-gray-400"
                ><v-icon name="md-contentcopy-round" />
              </i> -->
            </div>
          </div>
          <div class="notes relative">
            <h2>Note (Optional)</h2>
            <input v-model="form.notes" class="bg-gray rounded-md p-4 border border-white w-full" type='text'
              placeholder="Type your thought or any note..." />

          </div>
          <div class="actionButtons flex flex-row justify-end gap-4 py-2">
            <button @click="clearForm"
              class=" rounded-full bg-white  border border-black font-bold  hover:text-red-800 text-black w-[100px]">
              Clear
            </button>
            <button 
              type="submit"
              class="p-2 rounded-full hover:bg-white bg-loginGreen border border-black font-bold  text-white hover:text-green-800 w-[100px]">
              Save
            </button>

          </div>
        </form>
      </div>
    </div>
  </div>
</template>
