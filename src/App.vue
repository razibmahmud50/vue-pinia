<script setup>
  import { ref } from "vue";
  import {useTaskStore} from "./stores/TaskStore";
  import TaskDetails from "./components/TaskDetails.vue"
  import AddTaskForm from "./components/AddTaskForm.vue"

  const taskStore = useTaskStore();

  taskStore.getTaskData();

  const filter = ref("all")
</script>

<template>
  <header>
    <h3>{{ taskStore.name }}</h3>
  </header>
  <AddTaskForm/>
  <nav>
    <button @click="filter='all'">All task</button>
    <button @click="filter='favs'">fav task</button>
  </nav>
  <div class="task-list"  v-if="filter==='all'">
    <p>your have {{ taskStore.allCount }} task to do</p>
    <div v-for="item in taskStore.tasks">
      <TaskDetails :task="item"/>
    </div>
  </div>
  <div class="task-list" v-if="filter==='favs'">
    <p>your have {{ taskStore.favCount }} task to do</p>
    <div class="task-list">
      <div class="task"  v-for="item in taskStore.allFav">
        <h3>{{ item.title }}</h3>
        <div class="icons">
          <i class="material-icons">delete</i>
          <i class="material-icons">favorite</i>
        </div>
      </div>
    </div>
  </div>

  <main>
  </main>
</template>

