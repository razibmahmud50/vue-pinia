<script setup>
   import {ref} from "vue";
   import { uid } from 'uid';
   import {useTaskStore} from "../stores/TaskStore"

   const taskStore = useTaskStore();
   const taskTitle = ref("");

   const handleSubmit = () =>{
    if(taskTitle.value.length>0){
     taskStore.addTask({
            id: uid(),
            title: taskTitle.value,
            isFav :false
        })
        taskTitle.value="";
    }

   }
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <input
        type="text"
        placeholder="lorem ipsum"
        v-model="taskTitle" />
        <button>Add task</button>
    </form>
</template>