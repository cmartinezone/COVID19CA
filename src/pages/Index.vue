<template>
  <q-page class="fit flex justify-center non-selectable">
    <!-- Main Column "full width full height" -->
    <div class="column main-column q-px-sm q-pt-md q-pb-lg">
      <q-pull-to-refresh @refresh="refresh">
        <!-- select country row"  - -->
        <div class="row q-pb-md">
          <div class="col-12">
            <q-select
              rounded
              outlined
              hide-dropdown-icon
              style="font-size:18px;"
              popup-content-style="font-size:16px;"
              v-model="setCountry"
              :options="countryOptions"
              label="Selecionar País"
              no-error-icon
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="mdi-map-marker" />
              </template>
            </q-select>
          </div>
        </div>

        <div v-if="this.lastUpdate !== null" class=" q-px-sm">
          Última actualización: {{ this.lastUpdate }}
        </div>
        <!-- Total Cases  row   - -->
        <div class="row q-pb-md">
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
                      <span v-if="this.get_country_data != null">{{
                        get_country_data.cases | formatNumber
                      }}</span>
                      <span v-else>...</span>
                    </div>
                    <div
                      v-if="
                        this.get_country_data != null &&
                          this.get_country_data.todayCases != 0
                      "
                      class="text-italic text-green"
                    >
                      Incremento +
                      {{ get_country_data.todayCases | formatNumber }}
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <!-- Data Categories -->
        <div class="row q-pb-md q-col-gutter-md">
          <div
            class="col-6"
            v-for="(category, index) in casesCategoriesData"
            :key="index"
          >
            <q-card class="card-border text-white">
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
                        {{ category.total | formatNumber }}
                      </div>
                      <!-- Category Incrmented -->
                      <div
                        v-if="category.today !== 0"
                        class="text-italic text-right"
                        :class="'text-' + category.color"
                      >
                        + {{ category.today }}
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-pull-to-refresh>
      <!-- Chart all countries tests -->

      <!--  <div class="fit column justify-center q-pb-md">
          <distribution-chart
            class="col q-py-md all-pointer-events"
          ></distribution-chart>
        </div> -->
      <div
        v-if="this.get_historyCountry_cases !== null"
        class="fit column justify-center q-pb-md"
      >
        <infected-chart
          class="col q-pt-md q-pb-none q-pl-none q-pr-sm all-pointer-events overflow-hidden"
        ></infected-chart>
      </div>

      <div
        v-if="this.get_newDaily_cases !== null"
        class="fit column justify-center q-pb-md"
      >
        <new-daily-cases
          class="col q-pt-md q-pb-none q-pl-none q-pr-sm all-pointer-events overflow-hidden"
        ></new-daily-cases>
      </div>

      <div
        v-if="
          this.get_select_country == 'Todo Centro America' &&
            Object.keys(this.get_covid_data).length !== 0
        "
        class="fit column justify-center q-pb-md"
      >
        <tests-chart
          class="col q-pt-md q-pb-none q-px-sm all-pointer-events"
        ></tests-chart>
      </div>
    </div>
  </q-page>
</template>

<script>
import { analytics } from "boot/firebaseAnalytics";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      isMobile: this.$q.platform.is.mobile,
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
  components: {
    "tests-chart": require("components/charts/testsChart.vue").default,
    "distribution-chart": require("components/charts/distributionChart.vue")
      .default,
    "infected-chart": require("components/charts/infectedChart.vue").default,
    "new-daily-cases": require("components/charts/newDailyCases.vue").default,
    "select-country": require("components/statistics/countrySelection.vue").default
  },
  methods: {
    ...mapActions("Covid", [
      "set_select_country",
      "set_layoutTitle",
      "getCovidData"
    ]),
    refresh(done) {
      setTimeout(() => {
        this.getCovidData();
        this.forceSWupdate();
        done();
      }, 1000);
    },
    //Force PWA update
    forceSWupdate() {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .getRegistrations()
          .then(function(registrations) {
            for (let registration of registrations) {
              registration.update();
            }
          });
      }
    }
  },
  filters: {
    formatNumber(value) {
      if (isNaN(value)) return "...";
      value = new Intl.NumberFormat().format(value);
      return value;
    }
  },
  computed: {
    ...mapGetters("Covid", [
      "get_select_country",
      "get_country_data",
      "get_covid_data",
      "get_historyCountry_cases",
      "get_newDaily_cases",
      "lastUpdate"
    ]),
    casesCategoriesData() {
      const dataCategories = [
        {
          name: "Fallecidos",
          icon: "mdi-coffin",
          total:
            this.get_country_data != null
              ? this.get_country_data.deaths
              : "...",
          color: "red",
          today:
            this.get_country_data != null
              ? this.get_country_data.todayDeaths
              : 0
        },
        {
          name: "Activos",
          icon: "mdi-account-group",
          total:
            this.get_country_data != null
              ? this.get_country_data.active
              : "...",
          color: "light-blue",
          today: 0
        },
        {
          name: "Recuperados",
          icon: "mdi-heart-pulse",
          total:
            this.get_country_data != null
              ? this.get_country_data.recovered
              : "...",
          color: "cyan",
          today: 0
        },
        {
          name: "Pruebas",
          icon: "mdi-test-tube",
          total:
            this.get_country_data != null
              ? this.get_country_data.totalTests
              : "...",
          color: "amber",
          today: 0
        }
      ];
      return dataCategories;
    },

    //Set and Get select
    setCountry: {
      get() {
        return this.get_select_country;
      },
      set(value) {
        this.set_select_country(value);
      }
    }
  },
  mounted() {
    this.set_layoutTitle("Estadistícas");
  },
  created() {
    analytics.setCurrentScreen("/");
    //analytics.logEvent('eventname', {'firsttimeuser': true });
  }
};
</script>

<style lang="scss" scoped>
.main-column {
  width: 50%;
  height: 100%;
}

@media (max-width: $breakpoint-sm-max) {
  .main-column {
    width: 100%;
    height: 100%;
  }
}
</style>
