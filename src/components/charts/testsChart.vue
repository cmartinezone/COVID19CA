<template>
  <q-card class="fit card-border text-center">
    <q-card-section class="q-pa-none">
      <apexchart
        ref="TestsChart"
        type="bar"
        height="250px"
        width="100%"
        :options="countriesTestsChart"
        :series="this.get_contries_tests.series"
      />
    </q-card-section>
  </q-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "testsChart",
  data() {
    return {
      /* Chart */
      chartOptions: {
        colors: ["#ffc107", "#17ead9", "#f02fc2"],
        grid: {
          show: true,
          strokeDashArray: 0,
          xaxis: {
            lines: {
              show: true
            }
          }
        },
        chart: {
          toolbar: {
            show: false
          },
          background: "#192129"
        },
        title: {
          text: "Pruebas por país",
          align: "center",
          style: {
            color: "#FFFFFF",
            fontSize: "20px",
            fontFamily: "Roboto",
            fontWeight: 300
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 0
        },
        xaxis: {
          //Categories labels
          categories: [],
          labels: {
            show: true,
            style: {
              colors: "#fff",
              fontSize: "13px",
              fontFamily: "Roboto",
              fontWeight: 300
            }
          }
        },
        yaxis: {
          labels: {
            show: true,
            style: {
              color: ["#fff"],
              fontFamily: "Roboto",
              fontSize: "12px",
              fontWeight: 400
            },
            formatter: val => {
              return Intl.NumberFormat().format(val);
            }
          }
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return Intl.NumberFormat().format(val);
            }
          }
        }
      }
      /* End Chart */
    };
  },
  computed: {
    ...mapGetters("Covid", ["get_contries_tests"]),
    countriesTestsChart() {
      this.chartOptions.xaxis.categories = this.get_contries_tests.categories;
      return this.chartOptions;
    }
  },
  updated() {
    this.$refs["TestsChart"].refresh();
  }
};
</script>
