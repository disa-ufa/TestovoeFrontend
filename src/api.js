import axios from 'axios'


const API_BASE = 'http://109.73.206.144:6969'
const API_KEY = 'E6kUTYrYwZq2tN4QEtyzsbEBk3ie'


export function fetchData(endpoint, params = {}) {
  params.key = API_KEY 
  return axios.get(API_BASE + endpoint, { params })
}
