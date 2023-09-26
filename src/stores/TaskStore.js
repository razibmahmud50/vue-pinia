import { defineStore } from 'pinia'


export const useTaskStore = defineStore('task-store', {
    state: () => ({
        tasks: [],
        name: 'Mario'
    }
    ),
    getters: {
        allFav: (state) => {
            return state.tasks.filter((item) => item.isFav)
        },
        favCount: (state) => {
            return state.tasks.reduce((prev, current) => {
                return current.isFav ? prev + 1 : prev;
            }, 0)
        },
        allCount: (state) => {
            return state.tasks.length;
        }
    },
    actions: {
        async getTaskData() {
            const res = await fetch("http://localhost:3000/tasks")
            const data = await res.json()
            this.tasks = data
        },
        async addTask(task) {
            this.tasks.push(task)
            const res = await fetch("http://localhost:3000/tasks", {
                method: "POST",
                body: JSON.stringify(task),
                headers: { 'Content-type': 'application/json' }
            })
            if (res.error) {
                console.log(res.error)
            }
        },

        async deleteTask(id) {
            this.tasks = this.tasks.filter(t => {
                return t.id !== id
            })
            const res = await fetch("http://localhost:3000/tasks/" + id, {
                method: "DELETE"
            })
            if (res.error) {
                console.log(res.error)
            }
        },
        async toggleFav(id) {
            const task = this.tasks.find(t => t.id === id)
            task.isFav = !task.isFav

            const res = await fetch("http://localhost:3000/tasks/" + id, {
                method: "PATCH",
                body: JSON.stringify({ isFav: task.isFav }),
                headers: { 'Content-type': 'application/json' }
            })
            if (res.error) {
                console.log(res.error)
            }
        }
    }
})