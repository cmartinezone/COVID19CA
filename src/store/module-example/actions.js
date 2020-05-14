import axios from "axios"

export const getCovidData = async (/* context */) => {
  countries = [
    "Todos",
    "El Salvador",
    "Honduras",
    "Guatemala",
    "Costa Rica",
    "Panama",
    "Nicaragua",
    "Belize"
  ];
   

  try {
    countries.forEach(country => {
     // const countryData = await axios.get(` https://coronavirus-19-api.herokuapp.com/countries/${country}`)
      console.log(coun)
    });
  } catch (error) {
    console.log(error)
  }

};
