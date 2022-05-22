<template>
    <div class="app">
        <div class="router">
            <router-link to="/">Treninzi</router-link> |
            <router-link to="/vrsteTreninga">Vrste treninga</router-link> 
        </div>
        <div class="treninzi" v-for="t in poljeTreninga" :key="t.id">
        <ul class="treninzi-list">   
            <li><button class="trening" v-on:click="otvoriTrening(t.id)">
               <b>{{t.naziv}}</b> {{t.vrsta}} 
                </button>
            </li>   
        </ul>   
        </div> 
    </div>
</template>

<script>

import axios from 'axios';
  export default {
        data(){
            return {
                poljeTreninga: undefined,
            }
        },
        created() {
            axios.get(`http://localhost:5000/treninzi`)
            .then(response => {
                this.poljeTreninga = response.data
            })

        },
        methods: {
           otvoriTrening(key){
                this.$router.push({path: '/trening', query: {treningId: key} })
            }
        }
    }
   
</script>

<style scoped>

.app{
    font-family: sans-serif;
    padding: 10px;
}

.router{
    margin-bottom: 20px;
}

.treninzi-list{
    list-style: none;
}

.trening{
    background-color: aliceblue;
    border-radius: 5px;
    border: 1px solid black;
    padding: 5px;
}

</style>