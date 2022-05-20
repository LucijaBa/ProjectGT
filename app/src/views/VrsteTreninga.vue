<template>
    <div>
        <div class="router">
            <router-link to="/">Treninzi</router-link> |
            <router-link to="/vrsteTreninga">Vrste treninga</router-link> 
        </div>
        VRSTE TRENINGA
        <div class="vrste" v-for="v in vrsteTreninga" :key="v.id">
        <ul class="vrste-list">   
            <li>
                 <span contenteditable="true" v-bind:id="v.id">{{v.naziv}}</span>  <button v-on:click="urediVrstu(v.id)">Spremi</button>    <button v-on:click="obrisiVrstu(v.id)">Obriši</button>
            </li>   
        </ul>   
        </div> 
        <hr>

        Dodaj novu vrstu: <input id="nova_vrsta"> <button v-on:click="dodajVrstu()">Dodaj</button>
    </div>
</template>

<script>

import axios from 'axios';
  export default {
        data(){
            return {
                vrsteTreninga: undefined,
            }
        },
        created() {
            axios.get(`http://localhost:5000/vrsteTreninga`)
            .then(response => {
                this.vrsteTreninga = response.data
            })

        },
        methods: {
           obrisiVrstu(idVrsta){
                axios.post(`http://localhost:5000/obrisiVrstuTreninga?id=`+ idVrsta)
                .then(() => {
                    axios.get(`http://localhost:5000/vrsteTreninga`)
                    .then(response => {
                        this.vrsteTreninga = response.data
                    })
                })
                
            },
            dodajVrstu(){
                let nova = document.getElementById('nova_vrsta').value
                axios.post(`http://localhost:5000/dodajVrstuTreninga?naziv=`+ nova)
                .then(() => {
                    document.getElementById('nova_vrsta').value= ""
                    axios.get(`http://localhost:5000/vrsteTreninga`)
                    .then(response => {
                        this.vrsteTreninga = response.data
                    })
                })
            },
            urediVrstu(id){
                let nova = document.getElementById(id).textContent
                axios.post(`http://localhost:5000/urediVrstuTreninga?naziv=`+ nova + `&id=` + id)
                .then(() => {
                    axios.get(`http://localhost:5000/vrsteTreninga`)
                    .then(response => {
                        this.vrsteTreninga = response.data
                    })
                })
            }
        }
    }
   
</script>

<style scoped>


</style>