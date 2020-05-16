<template>
  <q-card class="fit card-border text-center">
    <q-card-section class="q-pb-none">
      <div class="text-h6 text-weight-light text-white">Pruebas por país</div>
      <apexchart
        type="bar"
        height="250px"
        width="100%"
        :options="chartOptions"
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
          // text: "undefined",
          align: "center",
          style: {
            color: "#FFF"
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 0
        },
        xaxis: {
          categories: [
            "El Salvador",
            "Honduras",
            "Guatemala",
            "Costa Rica",
            "Panama",
            "Nicaragua",
            "Belize"
          ],
          labels: {
            style: {
              colors: "#fff"
            }
          }
        },
        yaxis: {
          title: {
            text: "Cantidad",
            style: {
              color: "#fff"
            }
          },
          labels: {
            style: {
              color: "#fff"
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
    ...mapGetters("Covid", ["getContriesTests"])
  }
};
</script>

<style lang="scss"></style>
