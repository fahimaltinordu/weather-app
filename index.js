const apiKey = '0f674f7c0d57048089bc776ee003150f';
let inputCity = document.querySelector('#inputCity')
let checkBtn = document.querySelector('#checkBtn')
let cityDom = document.querySelector('#city')
let tempDom = document.querySelector('#temp')
let statusImage = document.querySelector('#status');
let tempStatusImage = document.querySelector('#tempStatus');
let humidityDom = document.querySelector('#humidity');
let windDom = document.querySelector('#wind');


function getData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    console.log(url);
    fetch(url)
    .then((response)=>response.json())
    .then((data)=>{

        console.log(data)

        cityDom.textContent = data.name.toUpperCase();

        let imgStatus = data.weather[0].main;
        if (imgStatus =="Clouds"){
            statusImage.src = 'img/cloudy.png'
        }else if (imgStatus =="Clear"){
            statusImage.src = 'img/sun.png'
        }else if (imgStatus =='Rain'){
            statusImage.src = 'img/rainy.png'
        }else if (imgStatus == "Snow"){
            statusImage.src = 'img/snowy.png'
        }

        let temparature_Value = data.main.temp;
        tempDom.textContent = `${temparature_Value} ℃`;
        if(temparature_Value<=10){
            tempStatusImage.src = 'img/cold.png'
        }else {
            tempStatusImage.src = 'img/hot.png'
        }

        let humidity_Value = data.main.humidity;
        humidityDom.textContent = `${humidity_Value}%`;

        let wind_Value = data.wind.speed;
        windDom.textContent = `${wind_Value} km/h`;
    })
    .catch(error => {
        alert('write valid city name')
    })
}

checkBtn.addEventListener('click', ()=> {
    let city = inputCity.value;
    getData(city);
    inputCity.value=''
})

window.addEventListener('load', function () {
    getData('istanbul');
})
