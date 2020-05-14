import axios from "axios"
import {Loading} from "quasar"

export const getCovidData = async ({commit, dispatch}) => {
  Loading.show()
  const countries = [
    "El Salvador",
    "Honduras",
    "Guatemala",
    "Costa Rica",
    "Panama",
    "Nicaragua",
    "Belize"
  ];
  
  let allCountries = []

  try {
   
   
    let res1 = await axios.get('https://coronavirus-19-api.herokuapp.com/countries/'+ countries[0]);
     allCountries.push(res1.data)
    let res2 = await axios.get('https://coronavirus-19-api.herokuapp.com/countries/'+ countries[1]);
    allCountries.push(res2.data)

    let res3 = await axios.get('https://coronavirus-19-api.herokuapp.com/countries/'+ countries[2]);
    allCountries.push(res3.data)
   
    let res4 = await axios.get('https://coronavirus-19-api.herokuapp.com/countries/'+ countries[3]);
    allCountries.push(res4.data)

    let res5 = await axios.get('https://coronavirus-19-api.herokuapp.com/countries/'+ countries[4]);
    allCountries.push(res5.data)
    
    let res6 = await axios.get('https://coronavirus-19-api.herokuapp.com/countries/'+ countries[5]);
    allCountries.push(res6.data)

    let res7 = await axios.get('https://coronavirus-19-api.herokuapp.com/countries/'+ countries[6]);
    allCountries.push(res7.data)

    commit('setCovidData', allCountries)
    
  } catch (error) {
    console.log(error)
  }
  Loading.hide()
};

export const selectCountry =  ({commit}, payload) => {  
    commit('setSelectCountry', payload)   
}