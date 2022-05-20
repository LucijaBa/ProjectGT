<template>
    <div>
        TRENINZI
        <div class="treninzi" v-for="t in poljeTreninga" :key="t.id">
        <ul class="treninzi-list">   
            <li><button class="trening" v-on:click="otvoriTrening(t.id)">
               {{t.naziv}} {{t.vrsta}} 
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


</style>