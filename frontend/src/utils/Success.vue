<script setup>
import { ref, watch, defineProps  } from "vue";

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'success', // Options: success, error, warning
  },
  timeout: {
    type: Number,
    default: 5000, // Default timeout: 5 seconds
  },
});

const visible = ref(false);

const showAlert = () => {  
  visible.value = true;
  setTimeout(() => {
    closeAlert();
  }, props.timeout)
}

const closeAlert = () => {
  visible.value = false;
};

watch(
  () => props.message,
  (newVal) => {
    if(newVal){
      console.log("show alert", newVal);
      showAlert(); 
    }
  },
  {immediate: true}
)

</script>

<template>
  <div v-if="visible" :class="['alert', props.type]"
  class="alert-container absolute top-[5px] left-[40%] p-4 rounded-lg max-w-[500px] break-words shadow-md backdrop-lg text-black text-wrap flex flex-row justify-between gap-1 z-[1000] animate-pulse"
 >
    <div class="flex items-center gap-1">
      <i 
      v-if="props.type === 'success'"
      class="bg-green-500 text-white rounded-full w-[20px] h-[20px] ">
      <v-icon
      name="md-done-twotone" /> 
      </i>
      <i 
      v-else-if="props.type === 'error'" 
      class="bg-red-600 text-white rounded-full w-[20px] h-[20px] ">
      <v-icon 
      name="md-error" />
    </i>
    <p>{{ props.message }}</p>
  </div>
    <i  @click="closeAlert"
    class="close-btn text-black "> 
      <v-icon 
      class="hover:bg-white rounded-full"
      name="io-close-outline"/>
    </i>
  </div>
</template>

<style scoped>
 .success{
  background-color: #dcfce7;
  border: 1px solid green;
}
 .error{
  background-color: #fee2e2;
  border: 1px solid red;
}
</style>
