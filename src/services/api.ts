import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public/',
})

const apiKey = `apikey=34f13930e1f2634cd10fe030121e27d1`;
const hashKey = `hash=25fa7b880db71e4481d6cfba6eb75670`

export async function getMarvelComics() {
  try {
    const fetchData = await api.get(`comics?orderBy=focDate&dateDescriptor=lastWeek&ts=1&${apiKey}&${hashKey}`)
    const comicsData = await fetchData.data.data.results
    return comicsData
  } catch (error) {
    console.log(error)
  }
}

export async function getSpecificComic(selectedComic: number) {
  try {
    const { data } = await api.get(`comics/${selectedComic}?ts=1&${apiKey}&${hashKey}`)
    const comicData = await data.data.results[0]
    return comicData
  } catch (error) {
    console.log(error)
  }
}