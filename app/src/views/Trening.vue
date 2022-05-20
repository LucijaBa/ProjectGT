<template>
    <div class="outer">

        <div class="router">
            <router-link to="/">Treninzi</router-link> |
            <router-link to="/vrsteTreninga">Vrste treninga</router-link> 
        </div>

        Naziv: <span contenteditable="true">{{ trening.naziv }}</span> <br><br>
        Opis: <span contenteditable="true">{{ trening.opis }}</span> 
        <br><br>
        Vrsta treninga:
        <select v-model="selectedValue">
			<option v-for="vrsta in vrsteTreninga" v-bind:key="vrsta.id" v-bind:value="vrsta.id">{{ vrsta.naziv }}</option>
		</select><br><br>

        <button>Spremi</button> 
        <button>Obriši</button>
       
       <br><br><br>
       TERMINI 
        <div class="termini" v-for="t in termini" :key="t.id">
        <ul class="termini-list">   
            <li>
               {{t.trener}} {{t.datum}} {{t.vrijeme}} <button>Uredi</button>    <button>Obriši</button>
        
            </li>   
        </ul>   
        <button>Dodaj novi termin</button>
        </div> 
    </div>
</template>

<script>
import axios from 'axios';

  export default {  
        data(){
            return {
                trening: undefined,
                termini: undefined,
                selectedValue: "",
                vrsteTreninga: undefined
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

            axios.get(`http://localhost:5000/vrsteTreninga`)
            .then(response => {
                this.vrsteTreninga = response.data
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