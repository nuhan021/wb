const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const axios = require('axios');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static',express.static(__dirname + '/public'));
app.set('view engine','ejs');

app.get('/', (req, res) => {
    const data = {
        location : 'your location',
        temp : 'your temp',
        desc : 'your description'
    }
    res.render('index',{data:data});
})

app.post('/',async(req,res)=>{
    let cityName = req.body.city;
    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=ca1dd5cb92efe5275e8109a4417bf37b&units=metric`;
    let response = await axios.get(URL);
    let temp = response.data.main.temp;
    let desc = response.data.weather[0].description;
    
    const data = {};
    data.location = cityName;
    data.temp = temp;
    data.desc = desc;

    res.render('index',{data:data});
})
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))