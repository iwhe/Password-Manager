<script setup>
// import Success from './utils/Success.vue';
import AlertContainer from './utils/AlertContainer.vue';
import { useAlertStore } from './state/alertStore';
const alertStore = useAlertStore();
</script>

<template>
  <router-view />
  <AlertContainer :alerts="alertStore.alerts" />
  <!-- <Success 
      v-if="alertStore.show"
      :message="alertStore.message"
      :type="alertStore.type" 
      timeout=  "5000"
    /> -->
 </template>

<style scoped>
  
</style>
