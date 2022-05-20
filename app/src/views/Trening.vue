<template>
    <div>

        <a href="/">Home</a>
        <a href="/">Treneri</a>
       TERMINI 
        <div class="termini" v-for="t in termini" :key="t.id">
        <ul class="termini-list">   
            <li>
               {{t.trener}} {{t.datum}} {{t.vrijeme}}
        
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
                trening: undefined,
                termini: undefined
            }
        },
        created() {
            axios.get(`http://localhost:5000/trening?id=` + this.$route.query.treningId)
            .then(response => {
                this.trening = response.data
            })

            axios.get(`http://localhost:5000/termini?trening=` + this.$route.query.treningId)
            .then(response => {
                this.termini = response.data
            })

        },
        methods: {
           obrisiTrening(){
                axios.get(`http://localhost:5000/obrisiTrening?id=` + this.trening.id)
                .then(response => {
                    this.trening = response.data
                })
                this.$router.push({path: '/home'})
            }
        }
    }
   
</script>

<style scoped>


</style>