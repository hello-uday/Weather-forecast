const {response} = require("express");
const express = require("express");
const https = require("https"); 
const bodyparser = require("body-parser");
const app = express();
app.use(bodyparser.urlencoded({extended : true}))

app.get("/",function(req,res){
   res.sendFile(__dirname + "/index.html");  
})

app.post("/",function(req,res){
    // console.log("request recieved");
    // console.log(req.body.cityName)   
    const name = req.body.cityName;
    const key = "764748a70895ca0b82e1ef4794ad70a4";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + name +"&appid=" + key + "&units=" + unit;
    // console.log('succes');

    https.get(url,function(response){            
        // console.log(response.statusCode);      
        response.on("data",function(data){
            const weatherdata = JSON.parse(data);  
            console.log(weatherdata);
            const temp = weatherdata.main.temp;
            const feels = weatherdata.main.feels_like;           
            
            const weatherdes = weatherdata.weather[0].description;     
            
            const yv = "The discription of the city is"
            res.write("<p>" + yv + weatherdes + "</p>");
            res.write("<h1>" +" The Temperature of the "+ name +" is "+ temp + " degrees Celcius")
            res.write("<h1>" +" The Temperature of the "+ name +" is feels like "+ feels + " degrees Celcius")
            res.send();
        })
    })
})

// app.get('/',(req,res)=>{
//     const url = "https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=764748a70895ca0b82e1ef4794ad70a4";
//     https.get(url,(response)=>{
//         response.on('data',(data)=>{
//             const weatherdata = JSON.parse(data);  
//             console.log(weatherdata);
//             const temp = weatherdata.main.temp;           
            
//             const weatherdes = weatherdata.weather[0].description;
//         })
//     })
// })

app.listen(1000,()=>console.log("Server is running on 1000 ")) 
