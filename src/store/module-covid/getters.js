export function get_select_country(state) {
  return state.select_country.name;
}

export function get_covid_data(state){
  return state.covid_data
}

export function get_country_data(state, getters) {
  if (state.select_country.name in state.covid_data) {
    return state.covid_data[state.select_country.name];
  } else if (
    state.select_country.name === "Todo Centro America" &&
    Object.keys(state.covid_data).length !== 0
  ) {
    return getters.get_all_countries_data;
  } else {
    return null;
  }
}

export function get_all_countries_data(state) {
  let all_countries_data = {
    cases: 0,
    todayCases: 0,
    deaths: 0,
    todayDeaths: 0,
    recovered: 0,
    active: 0,
    critical: 0,
    totalTests: 0
  };
  Object.values(state.covid_data).forEach(value => {
    all_countries_data.cases += value.cases;
    all_countries_data.todayCases += value.todayCases;
    all_countries_data.deaths += value.deaths;
    all_countries_data.todayDeaths += value.todayDeaths;
    all_countries_data.recovered += value.recovered;
    all_countries_data.active += value.active;
    all_countries_data.critical += value.critical;
    all_countries_data.totalTests += value.totalTests;
  });
  return all_countries_data;
}

export function get_contries_tests(state) {
  let contries = [];
  /*Convert from Object to Array */
  Object.values(state.covid_data).forEach(value => {
    contries.push(value);
  });

  /* Order array Contries by number of tests */
  contries.sort(function(a, b) {
    return b.totalTests - a.totalTests;
  });

  //Chart Data options
  let chartData = {
    series: [
      {
        name: "Pruebas",
        data: []
      }
    ],
    categories: []
  };

  //Push countries data into chart options
  contries.forEach(country => {
    chartData.categories.push(country.country);
    chartData.series[0].data.push(country.totalTests);
  });

  return chartData;
}
