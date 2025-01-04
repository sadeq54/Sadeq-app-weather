import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
app.use(express.static("public"));
const apiKey = "";
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/" ,  (req,res)=>{
  const city = "amman";
  axios.get(apiUrl+city+"&units=metric&appid="+apiKey)
    .then(response => {
      // Handle the response data here
      const resulte =response.data;
      res.render("index.ejs",{
        nameCountry:city,
        temp:resulte.main.temp,
        humidity:resulte.main.humidity,
        speed: resulte.wind.speed,
        description:resulte.weather[0].description,
        icon:resulte.weather[0].icon,
        speedWind:resulte.wind.speed
      })
    })
    .catch(error => {
      // Handle any errors here
      console.error('Error fetching data from OpenWeatherMap:', error);
    });
});

app.post("/search" ,  (req,res)=>{
  const city = req.body.country;
  if (city){
  axios.get(apiUrl+city+"&units=metric&appid="+apiKey)
    .then(response => {
      // Handle the response data here
      const resulte =response.data;
      

      res.render("index.ejs",{
        nameCountry:city,
        temp:resulte.main.temp,
        humidity:resulte.main.humidity,
        speed: resulte.wind.speed,
        description:resulte.weather[0].description,
        icon:resulte.weather[0].icon,
        speedWind:resulte.wind.speed
      })
      
    })
    .catch(error => {
      // Handle any errors here
      console.error('Error fetching data from OpenWeatherMap:', error);
    });
  }
  else {
    const city = "amman";
    axios.get(apiUrl+city+"&units=metric&appid="+apiKey)
      .then(response => {
        // Handle the response data here
        const resulte =response.data;
        res.render("index.ejs",{
          nameCountry:city,
          temp:resulte.main.temp,
          humidity:resulte.main.humidity,
          speed: resulte.wind.speed,
          description:resulte.weather[0].description,
          icon:resulte.weather[0].icon,
          speedWind:resulte.wind.speed
        })
      })
      .catch(error => {
        // Handle any errors here
        console.error('Error fetching data from OpenWeatherMap:', error);
      });
  }
});


app.listen(port,()=>{
console.log(`listen on port: ${port}`)
});
