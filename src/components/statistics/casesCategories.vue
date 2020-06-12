<template>
  <div>
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "casesCategories",

  filters: {
    formatNumber(value) {
      if (isNaN(value)) return "...";
      value = new Intl.NumberFormat().format(value);
      return value;
    }
  },
  computed: {
    ...mapGetters("Covid", ["get_country_data", "lastUpdate"]),
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
    }
  }
};
</script>
