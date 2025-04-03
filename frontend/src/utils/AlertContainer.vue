<script setup>
import { useAlertStore } from '../state/alertStore';

const alertStore = useAlertStore();
const props = defineProps({
  alerts: {
    type: Array,
  },
});

const removeAlert = (id) => {
  alertStore.clearAlert(id);
};
</script>

<template>
  <div class="alerts-container">
    <div
      v-for="alert in alerts"
      :key="alert.id"
      :class="['alert', `alert-${alert.type}`]"
    >

      <!-- Icon and Message Container -->
      <div class="flex items-center gap-2">
        <i
          v-if="alert.type === 'success'"
          class="bg-green-500 text-white rounded-full w-[24px] h-[24px] flex justify-center items-center"
        >
          <v-icon name="md-done-twotone" />
        </i>
        <i
          v-else-if="alert.type === 'error'"
          class="bg-red-600 text-white rounded-full w-[24px] h-[24px] flex justify-center items-center"
        >
          <v-icon name="md-error" />
        </i>
        <i
          v-else-if="alert.type === 'warning'"
          class="bg-yellow-500 text-white rounded-full w-[24px] h-[24px] flex justify-center items-center"
        >
          <v-icon name="md-warning" />
        </i>
        <i
          v-else
          class="bg-gray-500 text-white rounded-full w-[24px] h-[24px] flex justify-center items-center"
        >
          <v-icon name="md-info" />
        </i>

        <!-- Alert Message -->
        <span>{{ alert.message }}</span>
      </div>

      <!-- <span>{{ alert.message }}</span> -->
      <i class="close-btn text-black" @click="removeAlert(alert.id)">
        <v-icon 
      class="hover:bg-white rounded-full"
      name="io-close-outline"/>
      </i>
    </div>
  </div>
</template>


<style scoped>
.alerts-container {
  position: fixed;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
}
.alert {
  padding: 10px 15px;
  border-radius: 15px;
  font-size: 14px;
  color: rgb(0, 0, 0);
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 250px;
  max-width: 500px;
  overflow-wrap: break-word;
  gap: 20px;
  animation: slideTop 5s ease-in-out forwards;
}

@keyframes slideTop {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  10% {
    transform: translateY(0);
    opacity: 1;
  }
  90% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
}

.alert-success{
  background-color: #dcfce7;
  border: 1px solid green;
}
.alert-error{
  background-color: #fee2e2;
  border: 1px solid red;
}
.alert-warning {
  background-color: #f6ca88;
  border: 1px solid #ff9800;
}
/* .close-btn {
  background: none;
  border: none;
  color: rgb(75, 0, 0);
  font-size: 16px;
  cursor: pointer;
}

.close-btn :hover{
  color: #ff0000;
} */
</style>
