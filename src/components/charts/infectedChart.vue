<template>
  <q-card class="fit card-border text-center">
    <q-card-section class="q-pa-none">
      <apexchart
        ref="AreaChart"
        type="area"
        height="280px"
        width="100%"
        :options="countryHistoryCases"
        :series="get_historyCountry_cases.series"
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
      chartOptions: {
        colors: ["#00E396", "#03A9F4", "#EA3546"],
        fill: {
          colors: ["#00E396", "#03A9F4", "#EA3546"]
        },
        dataLabels: {
          show: false,
          enabled: false
        },
        chart: {
          defaultLocale: "es",
          height: "100%",
          type: "area",
          zoom: {
            enabled: false
          },
          locales: [
            {
              name: "es",
              options: {
                months: [
                  "Enero",
                  "Febrero",
                  "Marzo",
                  "Abril",
                  "May",
                  "Junio",
                  "Julio",
                  "Agosto",
                  "Septiembre",
                  "Octubre",
                  "Noviembre",
                  "Diciembre"
                ],
                shortMonths: [
                  "Ene",
                  "Feb",
                  "Mar",
                  "Abr",
                  "May",
                  "Jun",
                  "Jul",
                  "Ago",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dic"
                ],
                days: [
                  "Domingo",
                  "Lunes",
                  "Martes",
                  "Miercoles",
                  "Jueves",
                  "Viernes",
                  "Sabado"
                ],
                shortDays: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"]
              }
            }
          ],
          toolbar: {
            show: false
          },
          background: "#192129"
        },
        title: {
          text: "Casos confirmados",

          align: "center",
          style: {
            color: "#FFFFFF",
            fontSize: "20px",
            fontFamily: "Roboto",
            fontWeight: 300
          }
        },
        stroke: {
          curve: "smooth"
        },
        legend: {
          show: true,
          position: "top",
          horizontalAlign: "center",

          fontSize: "14px",
          fontFamily: "Roboto",
          fontWeight: 500,
          colors: ["#ffffff"],
          itemMargin: {
            horizontal: 5,
            vertical: 5
          }
        },
        xaxis: {
          type: "datetime",
          categories: [],
          labels: {
            show: true,
            style: {
              colors: "#fff",
              fontSize: "11px",
              fontFamily: "Roboto",
              fontWeight: 300
            }
          },
          tooltip: {
            enabled: false
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
          x: {
            show: true,
            format: "dd/MM/yy"
          },
          y: {
            formatter: function(val) {
              return Intl.NumberFormat().format(val);
            }
          }
        }
      }
    };
  },
  computed: {
    ...mapGetters("Covid", ["get_historyCountry_cases"]),

    countryHistoryCases() {
      this.chartOptions.xaxis.categories = this.get_historyCountry_cases.categories;
      return this.chartOptions;
    }
  },
  updated() {
    this.$refs["AreaChart"].refresh();
    // console.log(this.$refs["AreaChart"])
  }
};
</script>
