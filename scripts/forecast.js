class Forecast{
    constructor(){
        this.key = '1CYeGRneHHqKQsWLUBYVzqwtZ2IK728e';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    }
    async updateCity(city){
       const cityDets = await this.getCity(city);
       const weather = await this.getWeather(cityDets.Key);
    
       return { cityDets, weather };
    }
    async getCity(city){
       const query = `?apikey=${this.key}&q=${city}`;
       const response = await fetch(this.cityURI + query);
       if(response.status !== 200){
         throw new Error('Cannot fetch the data');
    }
       const data = await response.json();
       return data[0];    
    }
    async getWeather(id){
        const query =`${id}?apikey=${this.key}`

    const response = await fetch(this.weatherURI + query);
       if(response.status !== 200){
         throw new Error('Cannot fetch the data');
    }
       const data = await response.json();

       return data[0];
    }
}

// const key = '1CYeGRneHHqKQsWLUBYVzqwtZ2IK728e';

// // get city information
// const getCity = async (city) => {

//     const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
//     const query = `?apikey=${key}&q=${city}`;

//     const response = await fetch(base + query);
//     if(response.status !== 200){
//         throw new Error('Cannot fetch the data');
//     }

//     const data = await response.json();

//     return data[0];    
// };

// // get weather information
// const getWeather = async (id) => {

//     const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
//     const query =`${id}?apikey=${key}`

//     const response = await fetch(base + query);
//     if(response.status !== 200){
//         throw new Error('Cannot fetch the data');
//     }

//     const data = await response.json();

//     return data[0];    
// };


// // Starting the engine!!
// getCity('chicago')
//     .then(data => getWeather(data.Key))
//     .then((data)=> console.log(data))
//     .catch(err => console.log(err));

