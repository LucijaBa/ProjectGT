<template>
    <div class="outer">

        <div class="router">
            <router-link to="/">Treninzi</router-link> |
            <router-link to="/vrsteTreninga">Vrste treninga</router-link> 
        </div>

        Naziv: <span contenteditable="true" id="naziv">{{ trening.naziv }}</span> <br><br>
        Opis: <span contenteditable="true" id="opis">{{ trening.opis }}</span> 
        <br><br>
        Vrsta treninga:
        <select v-model="trening.vrstaId">
			<option v-for="vrsta in vrsteTreninga" v-bind:key="vrsta.id" v-bind:value="vrsta.id">{{ vrsta.naziv }}</option>
		</select><br><br>

        <button v-on:click="urediTrening()">Spremi</button> 
        <button v-on:click="obrisiTrening()">Obriši</button>
       
       <br><br><br>
       TERMINI <br>
        <div class="termini" v-for="t in termini" :key="t.id">
        <ul class="termini-list">   
            <li>
                <select v-bind:id="'termin' + t.id" v-bind:value="t.trener">
                    <option v-for="trener in treneri" v-bind:key="trener.id" v-bind:value="trener.id">{{ trener.ime }}</option>
                </select>
         {{t.datum}} {{t.vrijeme}} <button v-on:click="urediTermin(t.id)">Spremi</button>    <button v-on:click="obrisiTermin(t.id)">Obriši</button>
        
            </li>   
        </ul>   
        </div> 

        <input type="date" id="date"> <input type="time" id="time"> 
        <select id="trener">
            <option value="" selected disabled hidden>Odaberi trenera</option>
			<option v-for="trener in treneri" v-bind:key="trener.id" v-bind:value="trener.id">{{ trener.ime }}</option>
		</select>
        <button v-on:click="dodajTermin()">Dodaj novi termin</button>
    </div>
</template>

<script>
import axios from 'axios';

  export default {  
        data(){
            return {
                trening: undefined,
                termini: undefined,
                vrsteTreninga: undefined, 
                treneri:undefined            }
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

            axios.get(`http://localhost:5000/vrsteTreninga`)
            .then(response => {
                this.vrsteTreninga = response.data
            })

            axios.get(`http://localhost:5000/treneri`)
            .then(response => {
                this.treneri = response.data
            })
        },
        methods: {
           obrisiTrening(){
                axios.get(`http://localhost:5000/obrisiTrening?id=` + this.trening.id)
                .then(response => {
                    this.trening = response.data
                })
                this.$router.push({path: '/home'})
            },
            obrisiTermin(id){
                axios.post(`http://localhost:5000/obrisiTermin?id=` + id)
                .then(() => {
                     axios.get(`http://localhost:5000/termini?trening=` + this.trening.id)
                    .then(response => {
                        this.termini = response.data
                    })
                })
            },
            urediTrening(){
                let naziv = document.getElementById('naziv').textContent
                let opis = document.getElementById('opis').textContent
                let idVrsta = this.trening.vrstaId 
                axios.post(`http://localhost:5000/urediTrening?id=` + this.trening.id + `&naziv=` + naziv + `&opis=` + opis + `&idVrsta=` + idVrsta)
               
            },
            dodajTermin(){
                let datum = document.getElementById('date').value 
                let vrijeme = document.getElementById('time').value 
                let trener = document.getElementById('trener').value 
                axios.post(`http://localhost:5000/dodajTermin?trener=` + trener + `&trening=` + this.trening.id + `&datum=` + datum + `&vrijeme=` + vrijeme)
                .then(()=>{
                    axios.get(`http://localhost:5000/termini?trening=` + this.trening.id)
                    .then(response => {
                        this.termini = response.data
                    })
                })
            },
            urediTermin(id){
                let trener = document.getElementById('termin' + id).value
                axios.post(`http://localhost:5000/urediTermin?termin=` + id + `&trener=` +trener)
               
            }
            
        }
    }

   
</script>

<style scoped>

.outer{
    padding: 10px;
}

.router{
    margin-bottom: 20px;
}

</style>