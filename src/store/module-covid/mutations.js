export function setCovidData(state, payload) {
  state.covid_data = payload;
}

export function setSelectCountry(state, payload) {
  state.select_country = payload;
}

export function setLayoutTitle(state, payload) {
  state.layout_title = payload;
}

export function setTimeLineCovidData(state, payload) {
  Object.entries(payload).forEach(([key, value]) => {
    state.covid_data[key].timeline = value.timeline;
  });
}
