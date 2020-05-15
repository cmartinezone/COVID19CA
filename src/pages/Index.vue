<template>
  <q-page class="fit flex flex-top justify-center">
    <!-- Main Column "full width full height" -->
    <div class="fit column q-ma-md">
      <!-- select country row"  - -->
      <div class="row q-ma-sm">
        <div class="col-12">
          <q-select
            rounded
            outlined
            hide-dropdown-icon
            style="font-size:16px;"
            v-model="setCountry"
            :options="countryOptions"
            label="Selecionar País"
            no-error-icon
            emit-value
            map-options
          >
            <template v-slot:prepend>
              <q-icon color="primary" name="mdi-map-marker" />
            </template>
          </q-select>
        </div>
      </div>

      <!-- Total Cases  row   - -->
      <div class="row q-ma-sm">
        <div class="col-12">
          <q-card class="card-border text-white q-pa-sm">
            <q-card-section class=" q-my-none">
              <div class="text-h6 text-weight-light text-weight-light">
                Total de casos confirmados
              </div>
            </q-card-section>

            <q-card-section class="q-py-none">
              <div class="row">
                <div class="col-4">
                  <q-icon
                    name="mdi-check-bold"
                    color="green"
                    size="32px"
                  ></q-icon>
                </div>
                <div class="col-8 text-right">
                  <div class="text-h4 text-green">
                    <span v-if="getCountryData.length">{{ getCountryData[0].cases | formatNumber }}</span>
                    <span v-else>...</span>
                  </div>
                  <div v-if="getCountryData.length && getCountryData[0].todayCases != 0" class="text-italic text-green">
                    Incremento +  {{getCountryData[0].todayCases | formatNumber }}</div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Data Categories -->
      <div class="row q-pa-sm q-col-gutter-lg">
        <div class="col-6" v-for="(category, index) in localData" :key="index">
          <q-card class="card-border text-white ">
            <q-card-section>
              <div class="text-h6 text-weight-light">{{ category.name }}</div>
            </q-card-section>
                    
            <q-card-section class="q-pt-none q-pb-xs">
              <div class="column" style="height: 60px">
                  <div class="row">
                <div class="col-4">
                  <q-icon
                    :name="category.icon"
                    :color="category.color"
                    size="md"
                  ></q-icon>
                </div>
                  
                  <div class="col-8 q-pt-xs">
                <div
                  class="text-right text-subtitle1"
                  :class="'text-' + category.color"
                  style="font-size:20px;"
                >
                  {{ category.total | formatNumber}}
                </div>
                <!-- Category Incrmented -->
                   <div v-if="category.today !== 0" class="text-italic text-right" :class="'text-' + category.color"> 
                    + {{category.today}} </div>
                  </div>
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
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PageIndex",
  data() {
    return {
      isMobile: this.$q.platform.is.mobile,
      countryModel: null,
      countryOptions: [
        "Todo Centro America",
        "El Salvador",
        "Honduras",
        "Guatemala",
        "Costa Rica",
        "Panama",
        "Nicaragua",
        "Belize"
      ]
    };
  },
  methods: {
    ...mapActions("Covid", ["selectCountry", "getCovidData"])
  },
filters:{
    formatNumber(value) {
    if (isNaN(value)) return '...'
    value = new Intl.NumberFormat().format(value)
    return value
  }
},
  computed: {
    ...mapGetters("Covid", [
      "getCountrySelected",
      "getCountryData",
      "getCountrySelected"
    ]),
    localData() {
      const dataCategories = [
        {
          name: "Fallecidos",
          icon: "mdi-coffin",
          total: this.getCountryData.length
            ? this.getCountryData[0].deaths
            : "...",
          color: "red",
          today: this.getCountryData.length
            ? this.getCountryData[0].todayDeaths
            : 0
        },
        {
          name: "Activos",
          icon: "mdi-account-group",
          total: this.getCountryData.length
            ? this.getCountryData[0].active
            : "...",
          color: "light-blue",
          today:0
        },
        {
          name: "Recuperados",
          icon: "mdi-heart-pulse",
          total: this.getCountryData.length
            ? this.getCountryData[0].recovered
            : "...",
          color: "cyan",
          today:0
        },
        {
          name: "Pruebas",
          icon: "mdi-thermometer",
          total: this.getCountryData.length
            ? this.getCountryData[0].totalTests
            : "...",
          color: "amber",
          today:0
        }
      ];
      return dataCategories;
    },

    setCountry: {
      get() {
        return this.getCountrySelected;
      },
      set(value) {
        this.selectCountry(value);
      }
    }
  },
  created() {
   // this.getCovidData();
  }
};
</script>

<style lang="scss">
</style>
