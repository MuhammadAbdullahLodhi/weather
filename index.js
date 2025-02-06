require('dotenv').config();
const http = require("http");
const fs = require("fs");
var requests = require("requests");
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

const homeFile = fs.readFileSync("home.html","utf-8");

const replaceVal =(tempVal, orgVal) => {
    let temprature = tempVal.replace("{%tempval%}", orgVal.main.temp);
    temprature = temprature.replace("{%tempmin%}", orgVal.main.temp_min);
    temprature = temprature.replace("{%tempmax%}", orgVal.main.temp_max);
    temprature = temprature.replace("{%location%}", orgVal.name);
    temprature = temprature.replace("{%country%}", orgVal.sys.country);
    temprature = temprature.replace("{%tempstatus%}", orgVal.weather[0].main);
    temprature = temprature.replace("{%env%}", orgVal.weather[0].main);
    return temprature;
    
};
app.get('/', (req, res) => {
  res.send('<form action="/submit" method="post"><input type="text" placeholder="Enter City Name" name="name"><button>Submit</button></form>');
});
app.post('/submit', (req, res) => {
    
    const name = req.body.name;
    requests(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=946da2ad3192bb0b4d8e491e94366887&units=metric`
        )
     .on('data',  (chunk) => {
        const objdata = JSON.parse(chunk);
        const arrData = [objdata];
       //console.log(arrdata[0].main.temp)
       const realTimeData = arrData.map((val) => replaceVal(homeFile,val)).join("");
       res.write(realTimeData);
})  
     .on('end', (err) => {
if (err) return console.log('connection closed due to errors', err);

    console.log('end');
});

  });
  

app.listen(port, () => {
    console.log('Server listening on port 3000');
  });
  