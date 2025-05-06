const form = document.querySelector("form")


form.addEventListener("submit", (e) => {
   e.preventDefault()

   let description;

   let formData = new FormData(form)
   let obj = {}
   formData.forEach((value,key) => {
    obj[key] = value
   })

   let apiKey = "4660556ec5c7ee835797a24567905cfe"

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${obj.city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
        description = data.weather[0].description
        console.log(`City : ${data.name} , Temperature : ${data.main.temp} C , Description : ${data.weather[0].description}`)


        const target = document.querySelector(".changableIcon")
        const trgDegree = document.querySelector("#trgDegree")
        const trgDescription = document.querySelector("#trgDescription")

    function getWeatherIcon(description) {
         description = description.toLowerCase(); 
      
         if (description.includes('clear')) {
            return 'img/clear-sky.png';
         } else if (description.includes('rain')) {
            return 'img/rain.png';
         } else if (description.includes('snow')) {
            return 'img/snowflake.png';
         } else if (description.includes('cloud')) {
            return 'img/clouds.png';
         } else {
            return 'img/sunBlack.png'; 
         }
      }
      let iconResult = getWeatherIcon(description)
      target.style.backgroundImage = `url(${iconResult})`
      let temperature = `${Math.round(data.main.temp)} 'Celcius`
      trgDegree.textContent = temperature
      let domDescription = data.weather[0].description
      trgDescription.textContent = domDescription

      form.reset()
    })
    .catch(err => console.log(`${err} : Sorry you mispelled the city or the API problem :(`))
})


