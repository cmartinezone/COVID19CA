
export function get_country_data(state, getters) {
  if (state.select_country.name in state.covid_data) {
    return state.covid_data[state.select_country.name]
  }else if (state.select_country.name === 'Todo Centro America'  && Object.keys(state.covid_data).length !== 0 ) {
    return getters.get_all_countries_data
  }else{
    return null
  }
}

export function get_all_countries_data (state){
  let all_countries_data = {cases:0,"todayCases":0,"deaths":0,"todayDeaths":0,"recovered":0,"active":0,"critical":0,"totalTests":0}
  Object.entries(state.covid_data).forEach(([key, value]) => {
    all_countries_data.cases += value.cases
    all_countries_data.todayCases += value.todayCases
    all_countries_data.deaths += value.deaths
    all_countries_data.todayDeaths += value.todayDeaths
    all_countries_data.recovered += value.recovered
    all_countries_data.active += value.active
    all_countries_data.critical += value.critical
    all_countries_data.totalTests += value.totalTests
  });
  return all_countries_data
}


export function getCountryData(state, getters){
  let country =  state.covidData.filter(item => item.country === state.countrySelected)
  if (state.countrySelected === 'Todo Centro America') {
    country = [getters.getAllCMCountries]
  }
  return country
}

export function getAllCMCountries(state){
 // let allCMCountries = {"cases":0,"todayCases":0,"deaths":0,"todayDeaths":0,"recovered":0,"active":0,"critical":0,"totalTests":0}
 let allCMCountries = {cases:0,"todayCases":0,"deaths":0,"todayDeaths":0,"recovered":0,"active":0,"critical":0,"totalTests":0}
 state.covidData.forEach(country => {
      allCMCountries.cases += country.cases
      allCMCountries.todayCases += country.todayCases
      allCMCountries.deaths += country.deaths
      allCMCountries.todayDeaths += country.todayDeaths
      allCMCountries.recovered += country.recovered
      allCMCountries.active += country.active
      allCMCountries.critical += country.critical
      allCMCountries.totalTests += country.totalTests
  });
  
  return allCMCountries
}

export function getContriesTests(state) {
  let countriesTests = {
    series: [{
      name: 'Pruebas',
      data: [],
    }],
    categories:[]
  }
  state.covidData.forEach(country => {
    countriesTests.categories.push(country.country)
    countriesTests.series[0].data.push(country.totalTests)
  });
  return countriesTests
}

export function getCountrySelected(state){
   return state.countrySelected
}