
//getting the div element in which all html elements needs  to be inserted
let mainDiv=document.querySelector("#main-div");

//creating an async function for fetching rest countries API
const displayRestCountries = async ()=>{
    const response = await fetch("https://restcountries.com/v2/all");
    const data = await response.json();
    return data; //returning json data of API
}

displayRestCountries()
.then(data=>{ 
    //creating elements to store rest countries data
    mainDiv.innerHTML="";
    for(let i=0;i<data.length;i++){
        mainDiv.innerHTML=  mainDiv.innerHTML+`
        <div class="p-2 col-lg-4 col-sm-12">
            <div class="card mx-auto" style="width: 18rem;">
                <h5 class="card-title p-2 text-center bg-dark text-white mb-0">${data[i].name}</h5>
                <div class="card-body text-center" id="card-body">
                    <img src="${data[i].flags.svg}" class="card-img-top" alt="...">
                    <p class="card-text">Capital: ${data[i].capital}</p>
                    <p class="card-text">Region: ${data[i].region} </p>
                    <p class="card-text">LatLng: ${data[i].latlng}</p>
                    <p class="card-text">Country Code: ${data[i].alpha3Code}</Code></p>
                    <a href="#" class="btn btn-transparent border justify-content-center" >Click for Weather</a>
                 </div>
            </div>
         </div>
        `
    }
    return data;
}).then(data=>{ //after the data is recieved then fetching the weather data based on rest country data
    let weatherBtns=document.querySelectorAll("a");
    for(let i=0;i<weatherBtns.length;i++){
       weatherBtns[i].addEventListener('click',function (e){ //adding event listener for the country selected
        e.preventDefault();
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data[i].latlng[0]}&lon=${data[i].latlng[1]}&appid=b505dd77fec511d722d4720a2492f07f`)
        .then(response=>{
            return response.json();
        }).then(data=>{
            //displaying the weather data as a alert message
            alert(`
                Weather
                Descritpion: ${data.weather[0].description}
                Humidity: ${data.main.humidity}
                Temperature: ${data.main.temp}
            `);
        });
       });
    }

})
