/* export function getDataCountry (state) {
  
 let setCountry = null
 let searchCountry = state.countrySelected
 state.covidData.forEach(element => {
   if (element.country === searchCountry) {
     setCountry = element  
   }
 });
return setCountry
} */

export function getCountryData(state){
  let country =  state.covidData.filter(item => item.country === state.countrySelected)
  //let country = {"country":"El Salvador","cases":1037,"todayCases":0,"deaths":20,"todayDeaths":0,"recovered":374,"active":643,"critical":15,"casesPerOneMillion":160,"deathsPerOneMillion":3,"totalTests":46831,"testsPerOneMillion":7220}
 
 
  return country
}

export function covidData(state) {
  return state.covidData
}

export function getCountrySelected(state){
   return state.countrySelected
}