import axios from "axios";
import { analytics } from "boot/firebaseAnalytics";
import { Loading, LocalStorage, date } from "quasar";
const { addToDate } = date;

export const getCovidData = async ({ commit, dispatch, state }) => {
  const countries = [
    { name: "El Salvador", code: "SV" },
    { name: "Honduras", code: "HN" },
    { name: "Guatemala", code: "GT" },
    { name: "Costa Rica", code: "CR" },
    { name: "Panama", code: "PA" },
    { name: "Nicaragua", code: "NI" },
    { name: "Belize", code: "BZ" }
  ];

  try {
    Loading.show();
    let allCountries = {};
    const res1 = axios.get(
      "https://coronavirus-19-api.herokuapp.com/countries/" + countries[0].name
    );
    const res2 = axios.get(
      "https://coronavirus-19-api.herokuapp.com/countries/" + countries[1].name
    );
    const res3 = axios.get(
      "https://coronavirus-19-api.herokuapp.com/countries/" + countries[2].name
    );
    const res4 = axios.get(
      "https://coronavirus-19-api.herokuapp.com/countries/" + countries[3].name
    );
    const res5 = axios.get(
      "https://coronavirus-19-api.herokuapp.com/countries/" + countries[4].name
    );
    const res6 = axios.get(
      "https://coronavirus-19-api.herokuapp.com/countries/" + countries[5].name
    );
    const res7 = axios.get(
      "https://coronavirus-19-api.herokuapp.com/countries/" + countries[6].name
    );

    let responses = await axios.all([res1, res2, res3, res4, res5, res6, res7]);
    responses.forEach(response => {
      let countryKey = response.data.country;
      allCountries[countryKey] = response.data;
      allCountries[countryKey].timeline = null;
    });

    commit("setCovidData", allCountries);

    let lastSelectCountry = LocalStorage.getItem("last_set_country");

    if (lastSelectCountry) {
      dispatch("set_select_country", lastSelectCountry);
    } else if (
      state.select_country.name === null ||
      state.select_country.name === "Todo Centro America"
    ) {
      dispatch("set_select_country", "Todo Centro America");
    }
    Loading.hide();

    dispatch("get_Timeline_CovidData", countries);
  } catch (error) {
    console.log(error);
    Loading.hide();
  }
};

export const get_Timeline_CovidData = async ({ commit, dispatch }, payload) => {
  let allCountries = {};
  let countries = payload;
  let days = "all";
  try {
    const res1 = axios.get(
      `https://corona.lmao.ninja/v2/historical/${countries[0].name}?lastdays=${days}`
    );
    const res2 = axios.get(
      `https://corona.lmao.ninja/v2/historical/${countries[1].name}?lastdays=${days}`
    );
    const res3 = axios.get(
      `https://corona.lmao.ninja/v2/historical/${countries[2].name}?lastdays=${days}`
    );
    const res4 = axios.get(
      `https://corona.lmao.ninja/v2/historical/${countries[3].name}?lastdays=${days}`
    );
    const res5 = axios.get(
      `https://corona.lmao.ninja/v2/historical/${countries[4].name}?lastdays=${days}`
    );
    const res6 = axios.get(
      `https://corona.lmao.ninja/v2/historical/${countries[5].name}?lastdays=${days}`
    );
    const res7 = axios.get(
      `https://corona.lmao.ninja/v2/historical/${countries[6].name}?lastdays=${days}`
    );

    let responses = await axios.all([res1, res2, res3, res4, res5, res6, res7]);
    responses.forEach(response => {
      let countryKey = response.data.country;
      const data = { timeline: response.data.timeline };
      data.timeline.new_cases = null;
      allCountries[countryKey] = data;
    });

    Object.keys(allCountries).forEach(key1 => {
      let NewDailyCases = {};

      //Fixing El Salvador dataset one day delay
      if (key1 == "El Salvador") {
        let cases = {};
        let deaths = {};
        let recovered = {};
        Object.entries(allCountries[key1].timeline.cases).forEach(
          ([key2, value]) => {
            let caseDate = new Date(key2);
            caseDate.setDate(caseDate.getDate() - 1);
            let datekey = date.formatDate(caseDate, "M/D/YY");
            cases[datekey] = value;
            deaths[datekey] = allCountries[key1].timeline.deaths[key2];
            recovered[datekey] = allCountries[key1].timeline.recovered[key2];
          }
        );
        allCountries[key1].timeline.cases = cases;
        allCountries[key1].timeline.deaths = deaths;
        allCountries[key1].timeline.recovered = recovered;
      }
      //Fixing El Salvador dataset one day delay

      Object.entries(allCountries[key1].timeline.cases).forEach(
        ([key2, value]) => {
          let caseDate = new Date(key2);
          caseDate.setDate(caseDate.getDate() - 1);

          let datekey = date.formatDate(caseDate, "M/D/YY");
          let number = value - allCountries[key1].timeline.cases[datekey];
          NewDailyCases[key2] = number;
        }
      );
      allCountries[key1].timeline.new_cases = NewDailyCases;
    });

    commit("setTimeLineCovidData", allCountries);
  } catch (error) {
    console.log(error);
  }
};

export const set_select_country = ({ commit }, payload) => {
  //Record Google analytics country selection
  analytics.logEvent("select_country", { name: payload });
  //Set local storage to remember last selection
  LocalStorage.set("last_set_country", payload);

  commit("setSelectCountry", { name: payload });
};

export const set_layoutTitle = ({ commit }, payload) => {
  commit("setLayoutTitle", payload);
};


export const set_scroll_positon = ({commit}, payload) => {
  commit('SetScrollPosition', payload)
}