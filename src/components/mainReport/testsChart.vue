<template>
  <q-card class="fit card-border text-center">
    <q-card-section class="q-pb-none">
      <apexchart
        type="bar"
        height="250px"
        width="100%"
        :options="countriesChart"
        :series="this.getContriesTests.series"
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
              fontSize: '20px',
              fontFamily: 'Roboto',
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
            show:true,
            style: {
              colors: "#fff",
              fontSize: '13px',
              fontFamily: 'Roboto',
              fontWeight: 300
            }
          }
        },
        yaxis: {
          title: {
            text: "Cantidad",
            style: {
              color: "#fff",
              fontSize: '18px',
              fontFamily: 'Roboto',
              fontWeight: 300
            }
          },
          labels: {
            show:true,
            style: {
              color: "#fff",
              fontFamily: 'Roboto'
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
    ...mapGetters("Covid", ["getContriesTests"]),
    countriesChart(){
      this.chartOptions.xaxis.categories = this.getContriesTests.categories
      return this.chartOptions
    }
  }
};
</script>

<style lang="scss"></style>
