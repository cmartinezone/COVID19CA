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
            v-model="setCountry"
            :options="countryOptions"
            label="selecionar Pais"
            no-error-icon
            emit-value 
            map-options
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
          <div  class="text-h4 text-green">
            
            {{ getCountryData.length ? getCountryData[0].cases : '...' }} </div>
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
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'PageIndex',
  data() {
    return {
      isMobile: this.$q.platform.is.mobile,
      countryModel: null,
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
    }
  },
  methods:{
    ...mapActions('Covid', ['selectCountry', 'getCovidData'])
  },
  computed:{

    ...mapGetters('Covid', ['getCountrySelected','getCountryData', 'getCountrySelected']),
    localData(){
      const  dataCategories = [
       {
         name:'Fallecidos', 
        icon:'mdi-coffin',
        total: this.getCountryData.length ? this.getCountryData[0].deaths : '...',
         color:'red'
        },
       {
        name:'Activos', 
        icon:'mdi-account-group',
        total: this.getCountryData.length ? this.getCountryData[0].active : '...',
        color:'light-blue'
        },
       {
        name:'Recuperados', 
        icon:'mdi-heart-pulse',
        total: this.getCountryData.length ? this.getCountryData[0].recovered : '...',  
        color:'cyan'},
       {
        name:'Pruebas',
        icon:'mdi-thermometer',
        total: this.getCountryData.length ? this.getCountryData[0].totalTests : '...',
        color:'amber'}
       ]
      return dataCategories
    },

    setCountry: {
          get(){
              return this.getCountrySelected
          },
          set(value){
           this.selectCountry(value)
          }
      } 
  },
  created(){
    this.getCovidData()
  },
  mounted(){
    if (this.getCountrySelected == null) {
      this.selectCountry('Todo Centro America')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>