<template>
    <div>

        <router-link to="/">Home</router-link> |
        <router-link to="/">Treneri</router-link> <br>

       <p contenteditable="true">{{ trening.naziv }}</p> 
       <p contenteditable="true">{{ trening.opis }}</p> 
    <p id="vt" >{{trening.vrsta}}</p>
        <!--<Dropdown :title="trening.vrsta" :items="services" />-->
        
        

        <p>{{selectedValue}}</p>
        <p>{{vrstaTreninga}}</p>
        <select v-model="selectedValue">
				<option v-for="vrsta in vrsteTreninga" v-bind:key="vrsta.Id" v-bind:value="vrsta.Id">{{ vrsta.Name }}</option>
		</select><br><br><br>

        <button>Spremi</button> <!--Nakon uređivanja pohrani promjene-->
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
//import Dropdown from '../components/Dropdown.vue';
import axios from 'axios';

  export default {
        //components: { Dropdown },
  
        data(){
            return {
                trening: undefined,
                termini: undefined,
                selectedValue: "",
                vrstaTreninga: "",
                vrsteTreninga: []

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
        mounted() {
				this.vrsteTreninga.push({'Id': '1', 'Name': '1 na 1'});
                this.vrsteTreninga.push({'Id': '2', 'Name': '2 na 1'});
                this.vrsteTreninga.push({'Id': '3', 'Name': 'grupni'});

                
                if(this.vrstaTreninga == 'grupni') {
                    this.selectedValue = 3
                }
                else if(this.vrstaTreninga == '2 na 1') {
                    this.selectedValue = 2
                }
                else {
                    this.selectedValue = 1
                }			
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

</style>