<script setup>
const props = defineProps({
    onDelete: {
        type: Function,
        required: true,
    },
    onClose: {
        type: Function,
        required: true
    }
})
</script>

<template>
    <div class="max-w-[400px] container border border-gray-400 bg-black text-white p-4 rounded-3xl shadow-[0_0_30px_10px_rgba(25,25,25,0.8)]  backdrop-blur-lg hover:shadow-[0_0_30px_10px_rgba(255,255,255,0.8)] transition-shadow duration-300 ">
        <div class="flex flex-col justify-center items-center gap-2">
            <div class="text-center flex flex-col justify-center items-center gap-1">
            <p class="text-center font-bold text-3xl font-alfaSlab text-yellow-300">Are you sure? </p> 
            <span> Your password will be deleted permanently.</span>
            </div>
            <div class="flex flex-row justify-between gap-8 p-4">
                <button 
                @click="props.onClose"
                class="px-4 py-2 bg-green-600 rounded-full hover:bg-white hover:text-green-600">Cancel</button>
                <button 
                @click="props.onDelete"
                class="px-4 py-2 bg-red-600 rounded-full hover:bg-white hover:text-red-600">Delete</button>
            </div>
        </div>
    </div>
</template>