let apiKey = ''
let planetData = []

const fetchApiKey = async () => {
    try {
        const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys',{
            method: 'POST'
        });
        const data = await response.json();
        console.log(data)
        apiKey = data.key
        fetchplanetData()
        console.log(apiKey)
    } catch (error) {
        console.error('error fetching api key:', error)
        fetchApiKey() 
    }
}

const fetchplanetData = async () => {
    try {
        const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies', {
            method: 'GET',
            headers: { 'x-zocom': apiKey }
        });
        const data = await response.json();
        console.log(data); 
    } catch (error) {
        console.log('failed to get data:', error);
    }
}
fetchApiKey();

