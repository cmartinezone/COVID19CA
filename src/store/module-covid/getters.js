import { date } from "quasar";
const { addToDate } = date;

export function get_select_country(state) {
  return state.select_country.name;
}

export function get_covid_data(state) {
  return state.covid_data;
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
    totalTests: 0,
    timeline: null
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

  contries.forEach(country => {
    chartData.categories.push(country.country);
    chartData.series[0].data.push(country.totalTests);
  });

  return chartData;
}

export function get_historyCountry_cases(state, getters) {
  const country_data = getters.get_country_data;

  if (country_data !== null && country_data.timeline !== null) {
    let chartData = {
      series: [
        { name: "Cofirmados", data: [] },
        { name: "Recuperados", data: [] },
        { name: "Fallecidos", data: [] }
      ],
      categories: []
    };

    Object.entries(country_data.timeline.cases).forEach(([key, value]) => {
      if (value !== 0) {
        chartData.categories.push(key);
        chartData.series[0].data.push(value);
        chartData.series[1].data.push(country_data.timeline.recovered[key]);
        chartData.series[2].data.push(country_data.timeline.deaths[key]);
      }
    });

    return chartData;
  } else {
    return null;
  }
}

export function get_newDaily_cases(state, getters) {
  const country_data = getters.get_country_data;

  if (
    country_data !== null &&
    country_data.timeline !== null &&
    country_data.timeline.new_cases !== null
  ) {
    let chartData = {
      series: [{ name: "Nuevos Casos", data: [] }],
      categories: []
    };

    Object.entries(country_data.timeline.cases).forEach(([key, value]) => {
      if (value !== 0) {
        chartData.categories.push(key);
        chartData.series[0].data.push(country_data.timeline.new_cases[key]);
      }
    });

    return chartData;
  } else {
    return null;
  }
}

export function lastUpdate(state, getters) {
  let historyData = getters.get_historyCountry_cases;
  let currentCountryData = getters.get_country_data;
  let lastUpdate = null;

  if (historyData !== null) {
    let lastChartTotalCases =
      historyData.series[0].data[historyData.series[0].data.length - 1];
    let lastChartDateUpdate =
      historyData.categories[historyData.categories.length - 1];

      let verifyTotal = lastChartTotalCases + currentCountryData.todayCases;

    //Pending to further testing
    if (currentCountryData.cases >  verifyTotal && currentCountryData.country == 'El Salvador') {
      let today = new Date();
       today.setDate(today.getDate() - 1);
      lastUpdate = date.formatDate(today, "DD/MM/YY");
    }else{
      let today = new Date();
      lastUpdate = date.formatDate(today, "DD/MM/YY");
    }

    
    if (verifyTotal == currentCountryData.cases) {
      let newDate = new Date(lastChartDateUpdate);
      newDate.setDate(newDate.getDate() + 1);
      lastUpdate = date.formatDate(newDate, "DD/MM/YY");
    }

    if (currentCountryData.cases == lastChartTotalCases) {
      lastUpdate = date.formatDate(lastChartDateUpdate, "DD/MM/YY");
    }
  }

  return lastUpdate;
}
