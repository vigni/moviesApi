const searchInAPI = (search) => {
    


    const { data } = await request;

    const searchApi = (url, apiKey) => (search ,callback) =>{
        const request = axios.get(
            `http://www.omdbapi.com/?s=${search}$apikey=6191ba54`);
    
            request.then(({ data}) => callback(data));
    }

console.log(results);
};