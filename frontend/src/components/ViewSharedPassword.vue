<script setup>
import { getSharedPassword } from "@/services/share";
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAlertStore } from "@/state/alertStore";

const alertStore = useAlertStore();
const route = useRoute();
const id = route.params.id;
const router = useRouter();

const errorMsg = ref("");
const showPassword = ref(false);
const passwordDetail = ref({
  ownerName: "",
  ownerEmail: "",
  permission: "",
  passwordId: "",
  site: "",
  siteEmail: "",
  password: "",
  notes: "",
});

const getSharedPasswordDetail = async (id) => {
  try {
    const response = await getSharedPassword(id);

    if (response && response.data && response.data.data) {
      const passwordData = response.data.data;
      passwordDetail.value.ownerName = passwordData.ownerName;
      passwordDetail.value.ownerEmail = passwordData.ownerEmail;
      passwordDetail.value.permission = passwordData.permission;
      passwordDetail.value.passwordId = passwordData.password.passwordId;
      passwordDetail.value.site = passwordData.password.site;
      passwordDetail.value.siteEmail = passwordData.password.siteEmail;
      passwordDetail.value.password = passwordData.password.password;
      passwordDetail.value.notes = passwordData.password.notes;
      console.log("Password details", passwordDetail.value);
    }
    console.log(response);
  } catch (error) {
    console.error(error);

    errorMsg.value = error;
  }
};

const notes = computed(() => {
  return passwordDetail.value.notes || "No notes available";
});

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

onMounted(() => {
  getSharedPasswordDetail(id);
});

const copyToClipboard = (text) => {
  if (text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alertStore.triggerAlert({
          message: "Copied to clipboard",
          type: "success"
        })
        // alert("Copied to clipboard");
      })
      .catch((error) => {
        alertStore.triggerAlert({
          message: "Error in copying text",
          type: "error"
        })
        console.error("Error in copying text: ", error);
      });
  } else {
    alertStore.triggerAlert({
      message: "No text to copy",
      type: "error"
    })
    // alert("No text to copy");
  }
};

const getFullUrl = (url) => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
};

const redirectToHome = () => {
  router.push({ name: "home" });
};

const handleEditPassword = async (id) => {
  router.push({ name: 'edit password', params: { id } })
}
</script>

<template>
  <div>
    <div class="text-black flex flex-col justify-center items-center p-4">
      <div v-if="errorMsg">
        {{ errorMsg }}
      </div>
      <div class="container flex flex-col justify-center items-center">


        <div class="w-full flex gap-8 items-center">
          <font-awesome-icon @click="redirectToHome" :icon="['fas', 'arrow-left-long']"
            class="rounded-full hover:bg-gray p-4 text-2xl" />

          <h2 class="text-2xl capitalize">view password</h2>
        </div>

        <div class="flex justify-center mt-8">
          <div
            class="flex flex-col gap-4 content shadow-xl backdrop-xl rounded-xl border border-red-400/30 md:w-[600px] py-4 bg-[#fefefe]">

            <div class="w-full border-b border-red-400/30 flex flex-row justify-between  gap-2 items-center">
              <div class="flex flex-col justify-between">
                <div class="site flex gap-2 px-4">
                  <h2 class="">Site:</h2>
                  <a target="_blank" rel="noreferrer" referrerpolicy="no-referrer"
                    class="text-blue-600 font-monospace underline" :href="getFullUrl(passwordDetail.site)">
                    {{ passwordDetail.site }}
                  </a>
                  <!-- <input
                v-model="passwordDetail.site"
                readonly
                class="text-gray-500 bg-gray rounded-md p-4 border border-white w-full"
                type="text"
              /> -->
                </div>
                <div class="p-4 owner flex justify-start items-center gap-2">
                  <h2 class="text-[1.25rem] font-bold text-red-800">Owner</h2>
                  <div class="flex flex-col px-1 items-start leading-4 border-l-4 border-red-800/40 text-gray-400">
                    <h2>{{ passwordDetail.ownerName }}</h2>
                    <h2>{{ passwordDetail.ownerEmail }}</h2>
                  </div>

                </div>
              </div>
              <div v-if="passwordDetail.permission == 'edit'" class="actionIcons hover:bg-gray border border-gray rounded-2xl p-4 mx-4">
                <v-icon @click="handleEditPassword(passwordDetail.passwordId)" class="text-green-500 cursor-pointer hover:text-black"
                  name="fa-regular-edit" />
              </div>
            </div>
            <div class="flex flex-col gap-4 px-4">
              <div class="userName relative">
                <h2>Email</h2>
                <input v-model="passwordDetail.siteEmail" readonly
                  class="text-gray-500 rounded-md p-2 border-2 border-gray-500 w-full" type="text" />
                <i @click="copyToClipboard(passwordDetail.siteEmail)"
                  class="absolute top-[25px] right-[10px] p-2 rounded-full cursor-pointer hover:text-gray-400"><v-icon
                    name="md-contentcopy-round" /></i>
              </div>
              <div class="password relative ">
                <h2>Password</h2>
                <input v-model="passwordDetail.password" :type="showPassword ? 'text' : 'password'" readonly
                  class="text-gray-500 rounded-md p-2 border-2 border-gray-500 w-full" />
                <!-- <font-awesome-icon icon="fa-regular fa-eye" /> -->
                <div class="icons">
                  <i @click="togglePasswordVisibility" v-if="showPassword"
                    class="absolute top-[25px] right-[35px] p-2 rounded-full hover:text-gray-400 cursor-pointer"><v-icon
                      name="io-eye-off-outline" /></i>
                  <i @click="togglePasswordVisibility" v-else
                    class="absolute top-[25px] right-[35px] p-2 rounded-full hover:text-gray-400 cursor-pointer"><v-icon
                      name="io-eye-outline" /></i>
                  <i @click="copyToClipboard(passwordDetail.password)"
                    class="absolute top-[25px] right-[10px] p-2 rounded-full cursor-pointer hover:text-gray-400"><v-icon
                      name="md-contentcopy-round" />
                  </i>
                </div>
              </div>
              <div class="note ">
                <h2>Note</h2>
                <input v-model="notes" readonly class="text-gray-500 rounded-md p-2 border-2 border-gray-500 w-full"
                  type="text" />
              </div>
            </div>
            <div class="px-4 text-zinc-700 text-center">
              <p>You have permission to <span class="font-medium">{{ passwordDetail.permission }}</span> this password
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
