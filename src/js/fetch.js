import axios from 'axios';

export async function getImages(queryParametres, page = 1) {
    const BASE_URL = 'https://pixabay.com/api/';
    const KEY_API = '35926948-34936deeb45f6646a3d4cf3dc';
    return await axios.get(`${BASE_URL}?key=${KEY_API}&q=${queryParametres}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
}
