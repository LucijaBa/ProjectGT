<template>
    <div class="app">
        <div class="router">
            <router-link to="/">Treninzi</router-link> |
            <router-link to="/vrsteTreninga">Vrste treninga</router-link> 
        </div>
        VRSTE TRENINGA
        <div class="vrste" v-for="v in vrsteTreninga" :key="v.id">
        <ul class="vrste-list">   
            <li>
                 <span contenteditable="true" v-bind:id="v.id">{{v.naziv}}</span>  <button v-on:click="urediVrstu(v.id)" class="edit">Spremi</button>    <button v-on:click="obrisiVrstu(v.id)" clasS="delete">Obriši</button>
            </li>   
        </ul>   
        </div> 
        <hr>

        Dodaj novu vrstu: <input id="nova_vrsta"> <button v-on:click="dodajVrstu()" class="new">Dodaj</button>
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
                        alert("Uspješno obrisana vrsta treninga")
                    })
                }).catch()
                
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
                }).catch(()=>{
                    alert("Vrsta treninga s upisanim nazivom već postoji")
                })
            },
            urediVrstu(id){
                let nova = document.getElementById(id).textContent
                axios.post(`http://localhost:5000/urediVrstuTreninga?naziv=`+ nova + `&id=` + id)
                .then(() => {
                    axios.get(`http://localhost:5000/vrsteTreninga`)
                    .then(response => {
                        this.vrsteTreninga = response.data
                        alert("Uspješno uređeno")
                    })
                }).catch(()=>{
                    alert("Vrsta treninga s upisanim nazivom već postoji")
                })
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

.save{
    background-color: rgb(95, 199, 95);
}

.delete{
    background-color: rgb(225, 80, 80);
}

.edit{
    background-color: rgb(249, 249, 159);
}

.new{
    background-color: lightblue;
}

button{
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
    margin: 5px;
}

input{
    width: 120px;
    height: 15px;
}

select{
    margin-left: 5px;
}



</style>