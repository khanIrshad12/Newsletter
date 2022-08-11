const bodyParser = require("body-parser");
const express =require("express");
const { post } = require("request");
const app = express();
const https=require("https");
const { request } = require("http");
const { response } = require("express");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/signup",function(req,res){
   res.sendFile(__dirname+"/signup.html");
});

app.post("/signup",function(req,res){
   const Fname= req.body.Fname;
   const Lname= req.body.Lname;
   const Email = req.body.email;

   console.log(Fname);
   var data ={
    members:[{
        email_address:Email,
        status:"subscribed",

        merge_fields:{
            FNAME : Fname,
            LNAME:Lname,
        }
    }]
   };

   const jsonData =JSON.stringify(data);

   const url="";// example: https://us8.api.mailchimp.com/3.0/lists/81c9789ab 

   const Option = {
    method:"POST",
    auth:"",//example:Irshad:6277d41c1172de03f30cbc9190545tt8-your auth id exapme ux8
   }
   const request= https.request(url,Option,function(response){

    if(response.statusCode === 200){
        res.sendFile(__dirname+"/succes.html");
       }else{
        res.sendFile(__dirname+"/failure.html");
       }
    response.on("data",function(data){
        console.log(JSON.parse(data));
    });
   }); 

   request.write(jsonData);
    request.end();
});

app.post("/failure",function (req,res){
   return res.redirect("/signup");
});



app.listen(process.env.PORT || 3000,function(){
    console.log("server connected to 3000");
});

