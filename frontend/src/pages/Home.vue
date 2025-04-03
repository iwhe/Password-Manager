<script setup>
import { getAllPassword } from "@/services/password";
import { getCurrentUser } from "@/services/user";
import Profile from "@/utils/Profile.vue";
import SharedPassword from "@/components/SharedPassword.vue";
import Skeleton from "@/utils/skeleton/home.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAlertStore } from "@/state/alertStore";

const alertStore = useAlertStore();
const router = useRouter();
const user = ref(null);
const loading = ref(false);
const passwords = ref([]);
const displayProfile = ref(false);
const activeTab = ref("yourPasswords");

const storeNewPassword = () => {
  router.push({ name: "create password" });
};

const getUser = async () => {
  try {
    loading.value = true;
    const userResponse = await getCurrentUser();
    user.value = userResponse.data.data;
  } catch (error) {
    console.log(error);
    if (error.status == 401) {
      // alertStore.triggerAlert({
      //   message: error.response.data.message,
      //   type: "error",
      // })
      router.push({ name: "login" });
    } else if (error.status == 403) {
      alertStore.triggerAlert({
        message: error.response.data.message,
        type: "error",
      });
      router.push({ name: "verify twoFA" });
    } else {
      alertStore.triggerAlert({
        message: error.response.data.message,
        type: "error",
      });
    }
  } finally {
    loading.value = false;
  }
};

const getPasswordList = async () => {
  try {
    loading.value = true;
    const Password = await getAllPassword();
    const list = Password.data.data;
    passwords.value = list;
    // console.log("passwords", passwords.value);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getUser();
  getPasswordList();
});

const handlePasswordOpen = async (id) => {
  router.push({ name: "see password", params: { id } });
};

const onClose = () => {
  displayProfile.value = false;
};

// if(loading){
//   return <Skeleton/>
// }
</script>

<template>
  <Skeleton v-if="loading" />
  <div v-else>
    <div class="fixed w-screen h-[100px] bg-white z-[10]">
      <header
        class="relative w-[-webkit-fill-available] rounded-2xl bg-black/5 m-4 backdrop-blur-md shadow-sm flex flex-row justify-between items-center overflow-hidden"
      >
        <div class="left p-4">
          <img
            class="w-[120px] md:w-[150px] mix-blend-multiply"
            src="../assets/images/Password Manager (1).png"
          />
        </div>
        <div
          class="p-4 flex justify-between items-center gap-2 text-xs md:text-sm"
        >
          <button
            @click="storeNewPassword"
            class="p-2 md:p-4 h-fit bg-login text-white hover:text-green-300 rounded-full"
          >
            Store New Password
          </button>
          <div
            @click="displayProfile = true"
            class="w-[50px] h-[50px] rounded-full bg-white border border-gray-300 overflow-hidden"
          >
            <img
              src="../assets/images/profile.jpg"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>
    </div>

    <Profile v-if="displayProfile" :user="user" :onClose="onClose" />

    <main
      class="text-black flex pt-[100px] flex-col justify-center items-center relative text-md overflow-x-hidden"
    >
      <h2 class="text-left text-2xl text-green-600">
        Welcome!
        <span class="font-bold">{{ user?.name }}</span>
      </h2>
      <content class="flex justify-center items-center">
        <div class="p-4 w-screen lg:w-[900px] flex flex-col gap-2">
          <h2 class="text-4xl font-bold">Passwords</h2>
          <div
            class="p-4 shadow-md min-h-[200px] border border-gray-300 rounded-xl"
          >
            <div
              class="tab w-full flex flex-row text-[1.1rem] md:text-[1.25rem] justify-center gap-1 items-start height-[40px]"
            >
              <div
                @click="activeTab = 'yourPasswords'"
                :class="[
                  'w-full h-full text-center font-[600] cursor-pointer',
                  activeTab === 'yourPasswords'
                    ? 'bg-login text-transparent bg-clip-text border-b border-red-500'
                    : 'text-gray-400 cursor-pointer hover:border-b hover:border-gray-400 hover:text-black',
                ]"
              >
                Your Passwords
              </div>
              <div
                @click="activeTab = 'sharedPasswords'"
                :class="[
                  'w-full h-full text-center font-[600] cursor-pointer',
                  activeTab === 'sharedPasswords'
                    ? 'bg-login text-transparent bg-clip-text border-b border-red-500'
                    : 'text-gray-400 cursor-pointer hover:border-b hover:border-gray-400 hover:text-black',
                ]"
              >
                Shared Passwords
              </div>
            </div>

            <div v-if="activeTab === 'yourPasswords'">
              <div
                class="text-md text-center bg-login bg-clip-text text-transparent font-bold"
                v-if="passwords.length == 0"
              >
                Your stored passwords will be displayed here
              </div>
              <div
                @click="handlePasswordOpen(password?._id)"
                v-for="password in passwords"
                :key="password?._id"
                class="border-b border-gray-300 hover:bg-gray cursor-pointer"
              >
                <div
                  v-if="password"
                  class="relative border-box contain flex flex-row justify-between gap-2 items-center p-2"
                >
                  <div
                    class="logo w-12 min-w-12 overflow-hidden border border-gray-200 rounded-xl"
                  >
                    <img src="/password.jpg" alt="logo" />
                  </div>
                  <div class="relative text-black text- w-full truncate">
                    <p>{{ password?.site }}</p>
                  </div>
                  <div class="arrow text-black">
                    <font-awesome-icon :icon="['fas', 'caret-right']" />
                  </div>
                </div>
              </div>
            </div>
            <div v-else-if="activeTab === 'sharedPasswords'">
              <SharedPassword />
            </div>
          </div>
        </div>
      </content>
    </main>
  </div>
</template>
