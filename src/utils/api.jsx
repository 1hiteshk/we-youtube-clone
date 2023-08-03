import axios from "axios";

const BASE_URL = "https://youtube138.p.rapidapi.com";

const options = {
  params: { hl: "en", gl: "IN" },
  headers: {
    // 'X-RapidAPI-Key': '4a569ef254msh406a0b0cc48d3b0p12b4a5jsnc7f62921cf8c',
    'X-RapidAPI-Key': 'e49d39f346msh71e0fd138b605fap1fa8ffjsn832efb8de0a5',
    // 'X-RapidAPI-Key': 'f0c41001admsh85571333191c8b3p1e23f5jsn2866f221a861',
    'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
  }
};

export const fetchDataFromApi = async (url) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    return data;
};