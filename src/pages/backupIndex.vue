  <template>
  <q-page class="flex flex-top justify-center">
    <!-- Main Column "full width full height" -->
    <div class="fit column main-column q-ma-md" >
      <!-- select country row"  - -->
      <div class="row q-ma-sm">
        <div class="col-12">
          <q-select
            rounded 
            outlined
            style="font-size:16px;"
            ref="leng"
            v-model="countryModel"
            :options="countryOptions"
            label="selecionar Pais"
            no-error-icon
            @input="setCountry"
          >
            <template v-slot:prepend>
              <q-icon color="primary" name="mdi-map-marker"/>
            </template>
          </q-select>
        </div>
      </div>

 <!-- Total Cases  row   - -->
      <div class="row q-ma-sm">
        <div class="col-12">
          <q-card
      class="card-border text-white q-pa-sm"
    >
      <q-card-section class=" q-my-none">
        <div class="text-h6 text-weight-light text-weight-light">Total de casos confirmados</div>
      </q-card-section>

      <q-card-section  class="q-py-none">
        <div class="row">
          <div class="col-4">
          <q-icon  name="mdi-check-bold" color="green" size="32px"></q-icon>
        </div>
        <div class="col-8 text-right">
          <div class="text-h4 text-green">{{casesData.total}}</div>
        </div>
        </div>
      </q-card-section>
    </q-card>
        </div>
      </div>

<!-- Data Categories -->
      <div class="row q-pa-sm q-col-gutter-lg">
        <div class="col-6" v-for="(category, index) in  localData" :key="index">
         <q-card
      class="card-border text-white "
    >
      <q-card-section>
        <div class="text-h6 text-weight-light">{{category.name}}</div>
      </q-card-section>

       <q-card-section  class="q-pt-none">
        <div class="row">
          <div class="col-4">
          <q-icon  :name="category.icon" :color="category.color" size="md"></q-icon>
        </div>
        <div class="col-8 text-right text-subtitle1 q-pt-xs" :class="'text-'+category.color" style="font-size:20px;">
          {{category.total}}
        </div>
        </div>
      </q-card-section>
    </q-card>
        </div>
        </div>
      </div>
  </q-page>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: 'PageIndex',
  data() {
    return {
      isMobile: this.$q.platform.is.mobile,
      countryModel: 'Todo Centro America',
      countryOptions: [
        'Todo Centro America',
        'El Salvador',
        'Honduras',
        'Guatemala',
        'Costa Rica',
        'Panama',
        'Nicaragua',
        'Belize'
      ],

      casesData: {total:0, deaths:0, active:0, recovered:0, totalTests:0},
       
    }
  },
  methods:{
    ...mapActions('covid', ['getCovidData']),
    setCountry(){
     const selectedCountry = this.covidData.filter(element => {
         return element.country === this.countryModel
      });
     
     const country = selectedCountry[0]
     if (country) {
       this.casesData.total = country.cases
       this.casesData.deaths = country.deaths
       this.casesData.active = country.active
       this.casesData.recovered = country.recovered
       this.casesData.totalTests =  country.totalTests
     }
    }
  },
  computed:{
    ...mapState('covid',['covidData']),
    localData(){
      const  dataCategories = [
       {name:'Fallecidos', icon:'mdi-coffin', total:this.casesData.deaths, color:'red'},
       {name:'Activos', icon:'mdi-account-group', total:this.casesData.active, color:'light-blue'},
       {name:'Recuperados', icon:'mdi-heart-pulse', total:this.casesData.recovered, color:'cyan'},
       {name:'Pruebas', icon:'mdi-thermometer', total:this.casesData.totalTests, color:'amber'}
      ]
      return dataCategories
    }
  },
  created(){
    this.getCovidData()
  }
}
</script>

<style lang="scss" scoped>

</style>