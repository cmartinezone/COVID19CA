import axios from "axios"
import { analytics} from "boot/firebaseAnalytics";
import {Loading} from 'quasar'


export const getCovidData = async ({commit, dispatch, state}) => {
  const countries = [
    "El Salvador",
    "Honduras",
    "Guatemala",
    "Costa Rica",
    "Panama",
    "Nicaragua",
    "Belize"
  ];
  
  try {
    Loading.show()
    let allCountries = {}
    const res1 =  axios.get('https://coronavirus-19-api.herokuapp.com/countries/'+ countries[0]);
    const res2 =  axios.get('https://coronavirus-19-api.herokuapp.com/countries/'+ countries[1]);
    const res3 =  axios.get('https://coronavirus-19-api.herokuapp.com/countries/'+ countries[2]);
    const res4 =  axios.get('https://coronavirus-19-api.herokuapp.com/countries/'+ countries[3]);
    const res5 =  axios.get('https://coronavirus-19-api.herokuapp.com/countries/'+ countries[4]);
    const res6 =  axios.get('https://coronavirus-19-api.herokuapp.com/countries/'+ countries[5]);
    const res7 =  axios.get('https://coronavirus-19-api.herokuapp.com/countries/'+ countries[6]);
   
    let responses =  await axios.all([res1, res2, res3, res4, res5, res6, res7])
    responses.forEach(response => {
      allCountries[response.data.country] = response.data
    })

    commit('setCovidData', allCountries)

    if (state.select_country.name === null || state.select_country.name === 'Todo Centro America') {
      dispatch('set_select_country', 'Todo Centro America')
    }
    Loading.hide()
  } catch (error) {
    console.log(error)
    Loading.hide()
  }
};

export const set_select_country =  ({commit}, payload) => {  
  //Record Google analytics country selection  
  analytics.logEvent('select_country', { name: payload});
    commit('setSelectCountry', {name:payload})   
}

export const set_layoutTitle = ({commit}, payload) =>{
  commit('setLayoutTitle', payload)
}