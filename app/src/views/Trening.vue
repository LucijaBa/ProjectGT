<template>
    <div class="app">

        <div class="router">
            <router-link to="/">Treninzi</router-link> |
            <router-link to="/vrsteTreninga">Vrste treninga</router-link> 
        </div>

        Naziv: <span contenteditable="true" id="naziv"><b>{{ trening.naziv }}</b></span> <br><br>
        Opis: <span contenteditable="true" id="opis">{{ trening.opis }}</span> 
        <br><br>
        Vrsta treninga:
        <select v-model="trening.vrstaId">
			<option v-for="vrsta in vrsteTreninga" v-bind:key="vrsta.id" v-bind:value="vrsta.id">{{ vrsta.naziv }}</option>
		</select><br><br>

        <button v-on:click="urediTrening()" class="save">Spremi</button> 
        <button v-on:click="obrisiTrening()" class="delete">Obriši</button>
       
       <br>
       <hr>
       TERMINI <br>
        <div class="termini" v-for="t in termini" :key="t.id">
        <ul class="termini-list">   
            <li>
                <select v-bind:id="'termin' + t.id" v-model="t.trener">
                    <option v-for="trener in treneri" v-bind:key="trener.id" v-bind:value="trener.id">{{ trener.ime }}</option>
                </select>
         {{new Date(t.datum).toLocaleDateString()}} {{t.vrijeme}} <button v-on:click="urediTermin(t.id)" class="edit">Spremi</button>    <button v-on:click="obrisiTermin(t.id)" class="delete">Obriši</button>
        
            </li>   
        </ul>   
        </div> 

        <input type="date" id="date"> <input type="time" id="time"> 
        <select id="trener">
            <option value="" selected disabled hidden>Odaberi trenera</option>
			<option v-for="trener in treneri" v-bind:key="trener.id" v-bind:value="trener.id">{{ trener.ime }}</option>
		</select>
        <button v-on:click="dodajTermin()" class="new">Dodaj novi termin</button>
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
                axios.post(`http://localhost:5000/obrisiTrening?id=` + this.trening.id)
                .then(() => {
                    this.$router.push({path: '/'})
                }).catch()
                
            },
            obrisiTermin(id){
                axios.post(`http://localhost:5000/obrisiTermin?id=` + id)
                .then(() => {
                     axios.get(`http://localhost:5000/termini?trening=` + this.trening.id)
                    .then(response => {
                        this.termini = response.data
                        alert("Uspješno obrisan termin")
                    })
                }).catch()
            },
            urediTrening(){
                let naziv = document.getElementById('naziv').textContent.trim()
                let opis = document.getElementById('opis').textContent
                if(naziv==""){
                    alert("Naziv ne smije biti prazan")
                    return
                }
                let idVrsta = this.trening.vrstaId 
                axios.post(`http://localhost:5000/urediTrening?id=` + this.trening.id + `&naziv=` + naziv + `&opis=` + opis + `&idVrsta=` + idVrsta)
                .then(()=>{
                    alert("Uspješno uređen trening")
                })
                .catch(()=>{
                    alert("Ne smije postojati više treninga s istim nazivom i vrstom treninga")
                })
            },
            dodajTermin(){
                let datum = document.getElementById('date').value 
                let vrijeme = document.getElementById('time').value 
                let trener = document.getElementById('trener').value 
                console.log(datum)
                if(datum==""){
                    alert("Datum mora biti odabran")
                    return
                }
                if(vrijeme==""){
                    alert("Vrijeme mora biti odabrano")
                    return
                }
                if(trener==""){
                    alert("Trener mora biti odabran")
                    return
                }

                let datumD = new Date(datum + " " + vrijeme)
                let currentD = new Date()
                if(datumD < currentD){
                    alert("Vrijeme novog termina ne smije biti u prošlosti")
                    return
                }

                axios.post(`http://localhost:5000/dodajTermin?trener=` + trener + `&trening=` + this.trening.id + `&datum=` + datum + `&vrijeme=` + vrijeme)
                .then(()=>{
                    axios.get(`http://localhost:5000/termini?trening=` + this.trening.id)
                    .then(response => {
                        this.termini = response.data
                        document.getElementById('date').value = undefined
                        document.getElementById('time').value = undefined
                        document.getElementById('trener').value = undefined
                    })
                }).catch(()=>{
                    alert("Termini istog trenera se ne mogu preklapati")
                })
            },
            urediTermin(id){
                let trener = document.getElementById('termin' + id).value
                axios.post(`http://localhost:5000/urediTermin?termin=` + id + `&trener=` +trener)
                 .then(()=>{
                     alert("Uspješno promjenjen trener")
                 })
                 .catch(()=>{
                    alert("Termini istog trenera se ne mogu preklapati")
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

.termini-list{
    list-style: none;
}

.termin{
    background-color: aliceblue;
    border-radius: 5px;
    border: 1px solid black;
    padding: 5px;
}

input{
    width: 120px;
    height: 15px;
}

select{
    margin-left: 5px;
}


</style>