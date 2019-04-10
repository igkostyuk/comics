const API_KEY = `1136faa63131cec339ae63058b627b70`;
const API_TIMESTAMP = `1`;
// a md5 digest of the ts parameter, your private key and your public key (e.g. md5(ts+privateKey+publicKey)
const API_HASH = `7abf5f031a9f3f0031ac8c51fcfe8da0`;
const API_BASE = `http://gateway.marvel.com/v1/public/comics`;

const requests = `${API_BASE}?ts=${API_TIMESTAMP}&apikey=${API_KEY}&hash=${API_HASH}`;

export const getComicsList = async () => {
  const response = await fetch(requests);
  const results = await response.json();
  return results.data.results;
};

// var url = new URL('https://geo.example.org/api'),
//   params = { lat: 35.696233, long: 139.570431 };
// Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
