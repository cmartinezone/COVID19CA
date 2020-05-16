
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
  }
  state.covidData.forEach(country => {
  //  let val =  Intl.NumberFormat().format(country.totalTests)
    countriesTests.series[0].data.push(country.totalTests)
  });

  return countriesTests
}

export function getCountrySelected(state){
   return state.countrySelected
}