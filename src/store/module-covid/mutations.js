export function setCovidData (state, payload) {

  state.covidData = payload

  //As Object
  let covid_data = {}
  payload.forEach(country => {
    covid_data[country.country] = country
  });

  state.covid_data = covid_data

}
export function setSelectCountry(state, payload){
  state.countrySelected = payload

  //As Object
  state.select_country.name = payload
}


