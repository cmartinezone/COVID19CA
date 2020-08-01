<template>
  <q-page class="flex fit justify-center non-selectable">
    <!-- Main Column "full width full height" -->
    <div class="column main-column q-px-sm q-pt-md q-pb-xl">
      <q-pull-to-refresh @refresh="refresh">
        <!-- select country row"  - -->
        <div class="row q-pb-sm">
          <div class="col-12">
            <select-country />
          </div>
        </div>

        <template>
          <cases-categories />
        </template>
      </q-pull-to-refresh>
      <!-- Chart all countries tests -->
      <div v-if="this.get_historyCountry_cases !== null" class="fit column justify-center q-pb-sm">
        <infected-chart
          class="col q-pt-sm q-pb-none q-pl-none q-pr-sm all-pointer-events overflow-hidden"
        ></infected-chart>
      </div>

      <div v-if="this.get_newDaily_cases !== null" class="fit column justify-center q-pb-md">
        <new-daily-cases
          class="col q-pt-sm q-pb-none q-pl-none q-pr-sm all-pointer-events overflow-hidden"
        ></new-daily-cases>
      </div>

      <div
        v-if="
          this.get_select_country == 'Todo Centro America' &&
            Object.keys(this.get_covid_data).length !== 0
        "
        class="fit column justify-center q-pb-md"
      >
        <tests-chart class="col q-pt-sm q-pb-none q-px-sm all-pointer-events"></tests-chart>
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
      isMobile: this.$q.platform.is.mobile
    };
  },
  components: {
    "select-country": require("components/statistics/countrySelection.vue")
      .default,
    "cases-categories": require("components/statistics/casesCategories.vue")
      .default,
    "tests-chart": require("components/charts/testsChart.vue").default,
    "infected-chart": require("components/charts/infectedChart.vue").default,
    "new-daily-cases": require("components/charts/newDailyCases.vue").default
  },
  methods: {
    ...mapActions("Covid", ["set_layoutTitle", "getCovidData"]),
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
            registrations.forEach(registration => {
              registration.update();
              console.log("Forcing PWA update!");
            });
          });
      }
    }
  },
  computed: {
    ...mapGetters("Covid", [
      "get_select_country",
      "get_covid_data",
      "get_historyCountry_cases",
      "get_newDaily_cases"
    ])
  },
  mounted() {
    this.set_layoutTitle("Estadistícas");
  },
  created() {
    analytics.setCurrentScreen("/");
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
