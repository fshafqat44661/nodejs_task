import axios from 'axios';

const API_URL = 'http://localhost:3000/superheroes';

export const addSuperhero = (hero) => axios.post(API_URL, hero);
export const getSuperheroes = () => axios.get(API_URL);
