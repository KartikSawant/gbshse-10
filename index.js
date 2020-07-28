const express = require('express')
const app = express()
var port = process.env.PORT || 3000
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.get('/',(req,res)=>{
    res.render('index');
})
app.get('/search', (req, res) => {
    var response=[];
    function search(name,centre) {
        name=name.toLowerCase();
        var data=require('./data/'+centre);
        for(var i=0;i<data.length;i++)
        {
            var check=data[i].name.toLowerCase();
            if(check.includes(name))
            {
                var obj={
                    "name":data[i].name,
                    "roll":data[i].roll,
                    "res":data[i].res
                }
                response.push(obj);
            }
        }
    }
    search(req.query.query,req.query.centre);
    res.render('search',{response:response,queries:req.query});
})
app.post('/result',(req,res)=>{
    res.render('result',{response:req.body});
})
app.listen(port);