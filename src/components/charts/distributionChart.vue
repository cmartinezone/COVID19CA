<template>
  <q-card v-if="casesSeries !== null" class="fit card-border text-center">
    <q-card-section class="q-pa-none">
      <apexchart
        type="donut"
        height="260px"
        width="100%"
        :options="chartOptions"
        :series="casesSeries"
      />
    </q-card-section>
  </q-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "distributionChart",
  data() {
    return {
      // series: [200, 50, 10],
      totalCases: 0,
      chartOptions: {
        plotOptions: {
          pie: {
            donut: {
              customScale: 0.8
            }
          }
        },
        colors: ["#03a9f4", "#00bcd4", "#f44336"],
        title: {
          text: "Distribución",
          align: "center",
          style: {
            color: "#FFFFFF",
            fontSize: "20px",
            fontFamily: "Roboto",
            fontWeight: 300
          }
        },
        responsive: [
          {
            breakpoint: 420,
            options: {
              chart: {
                width: "100%"
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ],
        labels: ["Activos", "Recuperados", "Fellecidos"],
        tooltip: {
          style: {
            fontSize: "12px",
            fontFamily: undefined
          },
          y: {
            formatter: function(val) {
              //let total = Math.floor(val/this.get_country_data.cases*100)
              return Intl.NumberFormat().format(val);
            }
          }
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          // position: "bottom",
          labels: {
            colors: "#FFF"
          },
          colors: "#fff",
          fontSize: "16px",
          fontFamily: "Roboto",
          fontWeight: 300
        }
      }
    };
  },
  methods: {
    getPorcentage(val) {
      console.log(val);
    }
  },
  computed: {
    ...mapGetters("Covid", ["get_country_data"]),
    casesSeries() {
      let country_data = this.get_country_data;
      let series_cases = [];
      if (country_data !== null) {
        series_cases = [
          country_data.active,
          country_data.recovered,
          country_data.deaths
        ];
      } else {
        series_cases = null;
      }
      return series_cases;
    }
  }
};
</script>
