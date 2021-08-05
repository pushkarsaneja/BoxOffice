const API_BASE_URL = 'https://api.tvmaze.com';

const apiGet = async queryString => {
  const response = await fetch(`${API_BASE_URL}${queryString}`).then(r =>
    r.json()
  );
  return response;
};

export default apiGet;
