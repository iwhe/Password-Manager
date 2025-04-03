<script setup>
import { deletePassword, viewPassword } from '@/services/password';
import { onMounted, computed, ref } from 'vue';
import { useRoute, useRouter  } from 'vue-router';
import Delete from '@/utils/Delete.vue';
import Share from '@/utils/Share.vue';
import ConfirmShare from '@/components/ConfirmShare.vue';
import { useAlertStore } from '@/state/alertStore';

const alertStore = useAlertStore();
const route = useRoute();
const id = route.params.id;
const router = useRouter();

const receiverId = ref("");
const receiverName = ref("");

const displayDelete = ref(false);
const onClose = () => {
  displayDelete.value = false;
};


const displayShare = ref(false);
const onDisplayClose = () => {
  displayShare.value = false;
}

const displayConfirmShare = ref(false);
const cancelConfirmShare = () => {
  displayConfirmShare.value = false;
}

const showPassword = ref(false);
const passwordDetail = ref({
  site: '',
  siteEmail: '',
  password: '',
  notes: ''
})

const togglePasswordVisibility = () => {
  // console.log("Toggling password visibility");
    showPassword.value = !showPassword.value;
}

const getPasswordDetail = async(id) => {
  try {
    const response = await viewPassword(id);
    console.log(response);
    passwordDetail.value = response.data.data;
    console.log("Password details", passwordDetail.value);
  } catch (error) {
    if(error.status == 401){
      alertStore.triggerAlert({
        type: 'error',
        message: "You are not unauthorised to see this password"
      })
      router.push({name: "home"})
    }
    console.error("Error fetching password details:", error);
  }
}

const notes = computed(() => {
  return passwordDetail.value.notes || 'No notes available';
});

onMounted(() => {
  getPasswordDetail(id);
});

const copyToClipboard = (text) => {
    if(text){
        navigator.clipboard
        .writeText(text)
        .then(() => {
            // alert("Copied to clipboard")
            alertStore.triggerAlert({
              message: "Copied to clipboard",
              type: 'success',
            })
        })
        .catch((error) => {
          alertStore.triggerAlert({
              message: "Error in copying text",
              type: 'error',
            })
            console.error('Error in copying text: ', error);
        })
    } else {
        // alert("No text to copy");
        alertStore.triggerAlert({
              message: "No text to copy",
              type: 'error',
            })
    }
}

const getFullUrl = (url) => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
};

const redirectToHome = () => {
  router.push({ name: 'home' });
};

const handleEditPassword= async(id) =>{
    router.push({name: 'edit password' ,  params: { id }} )
}

const handleDeletePassword = async (id) => {
  const response = await deletePassword(id);
  if (response.status === 200) {
    // alert("Password deleted successfully")
    alertStore.triggerAlert({
        message: 'Password Deleted Successfully',
        type: 'success',
      });
    router.push({ name: 'home' });
  }
}

// const closeOnOutsideClick = (event) => {
//       const modal = ref.modal; // Reference to the modal content
//       console.log(modal);
      
//       if (modal && !modal.contains(event.target)) {
//         // Check if clicked outside modal
//         displayShare.value = false;
//       }
//     }

const getReceiverDetails = (payload) => {
    console.log("Receiver DATA", payload);
    
    receiverId.value = payload.receiverId;
    receiverName.value = payload.receiverName;

    console.log("Receiver name", receiverName);
    console.log("Receiver name value", receiverName.value);
    
    displayConfirmShare.value = true;
}
</script>

<template>
 
  <div class="fixed bg-[#f1f1f1] w-screen h-screen text-black p-4 md:p-8">
    <div class="flex flex-col justify-center items-center w-max sm:w-full ">
      <Delete  
      class="fixed z-[10]"
      v-if="displayDelete" :onDelete = "() => handleDeletePassword(id)" :onClose = "onClose"/>
   
      <div class="w-full flex gap-8 items-center">
        
          <font-awesome-icon
            @click="redirectToHome"
            :icon="['fas', 'arrow-left-long']"
            class="rounded-full hover:bg-gray p-4 text-2xl"
          />


        <h2 class="text-2xl capitalize">view password</h2>
      </div>
      
      <div class="flex justify-center mt-8 w-full">
        <div
          class="flex flex-col gap-4 content bg-[#fafafa] shadow-2xl backdrop-xl rounded-xl border border-black/30 p-4 min-w-[350px] max-w-[600px] "
        >
        <div class="actionButtons flex flex-row justify-end items-center gap-4 border-b border-black/30">
      
          <Share
      v-if="displayShare"
      class="z-[2]"
      :onClose = "onDisplayClose"
      @receiverDetails = "getReceiverDetails"
      />
          <div class="relative group"> 
            <div class="absolute -top-7 -right-5 px-2 bg-black text-sm text-white border border-gray-600 rounded-full opacity-0 group-hover:opacity-100"
            >
            Share
          </div>
            <v-icon 
        @click="displayShare = true"
        class="text-blue-500 cursor-pointer hover:text-black"
        name="io-share"
          />
           </div>
           <div class="relative group"> 
            <div class="absolute -top-7 -left-3 px-2 bg-black text-sm text-white border border-gray-600 rounded-full opacity-0 group-hover:opacity-100"
            >
            Edit
            </div>
          <v-icon 
        @click="handleEditPassword(id)"
        class="text-green-500 cursor-pointer hover:text-black"
        name="fa-regular-edit"
          />
        </div>

          <!-- <button
          @click="displayDelete = true"
            class="p-4 rounded-xl bg-brand hover:bg-black text-white w-[100px]"
          >
            Delete
          </button> -->
          <div class="relative group"> 
            <div class="absolute -top-7 -left-5 px-2 bg-black text-sm text-white border border-gray-600 rounded-full opacity-0 group-hover:opacity-100"
            >
            
            Delete
            </div>
          <v-icon 
        @click="displayDelete = true"
        class="text-red-500 cursor-pointer hover:text-black"
        name="md-delete"
          />
         </div>
      
        </div>
        <!-- <div class="flex flex-col md:flex-row justify-between "> -->
        <div class="site flex flex-row gap-2">
            <!-- <h2>Site:</h2> -->
            <a 
            
            target="_blank"
            rel="noreferrer"
            :href="getFullUrl(passwordDetail.site)" 
            class="font-bold text-blue-600 underline text-xl truncate"
            >
            {{ passwordDetail.site }}
          </a>
            <!-- <input
              v-model="passwordDetail.site" readonly
              class="text-gray-500 rounded-md p-2 border-2 border-gray-500 w-full"
              type="text"
            /> -->
          </div>
       
      <!-- </div> -->
          <div class="userName relative">
            <h2>Email/Username</h2>
            <input
            v-model="passwordDetail.siteEmail" readonly
              class="text-gray-700 rounded-md p-2 pr-10 border-2 border-gray-500 w-full overflow-x-scroll"
              type="text"
            />
            <i
            @click="copyToClipboard(passwordDetail.siteEmail)"
              class="absolute top-[25px] right-[5px] p-2 rounded-full cursor-pointer hover:text-gray-400"
              ><v-icon name="md-contentcopy-round"
            /></i>
          </div>
          <div class="password relative">
            <h2>Password</h2>
            <input
              v-model="passwordDetail.password" 
              :type="showPassword ? 'text' : 'password'"
              readonly
              class="text-gray-700 rounded-md p-2 border-2 border-gray-500 w-full"
              
            />
            <div class="icons">
              <i 
              @click="togglePasswordVisibility"
              v-if="showPassword"
                class="absolute top-[25px] right-[35px] p-2 rounded-full hover:text-gray-400 cursor-pointer"
                ><v-icon name="io-eye-off-outline"
              /></i>
              <i @click="togglePasswordVisibility" 
              v-else  
              class="absolute top-[25px] right-[35px] p-2 rounded-full hover:text-gray-400 cursor-pointer"
                ><v-icon name="io-eye-outline"
              /></i>
              <i
               @click="copyToClipboard(passwordDetail.password)"
                class="absolute top-[25px] right-[5px] p-2 rounded-full cursor-pointer hover:text-gray-400"
                ><v-icon name="md-contentcopy-round" />
              </i>
            </div>
            </div>
            <div class="note">
            <h2>Note</h2>
            <input
              v-model="notes" readonly
              class="text-gray-700 rounded-md p-2 border-2 border-gray-500 w-full"
              type="text"
            />
          </div>
          
        </div>
      </div>
       </div>
       
  </div>
    <ConfirmShare 
        v-if="displayConfirmShare"
        class="z-[100] absolute"
        :cancelShare = "cancelConfirmShare"
        :passwordId = "id"
        :site = "passwordDetail.site"
        :receiverId = "receiverId"
        :receiverName = "receiverName"
    />
</template>
