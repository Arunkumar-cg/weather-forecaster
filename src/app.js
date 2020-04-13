const path=require('path')

const express=require('express')

const app=express()
const hbs=require('hbs')
const geocode=require("./utils/geocode")
const forecast=require("./utils/forecast")
const port =process.env.PORT || 3000

const pathdiri =path.join(__dirname,'../public')
const viewpath =path.join(__dirname,'../template/views')
const partialspath=path.join(__dirname,'../template/partials')
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialspath)
app.use(express.static(pathdiri))

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather forecaster',
        name:'arun'
    })
})
app.get('/about',(req,res) =>{
    res.render('about',{
        to:'hai everybody',
        title:'about',
        name:'arun'
    })
})
app.get('/help',(req,res)=>
res.render('help',{
    help:"glad to here you",
    title:'Happy to help you',
    name:'arun'
}))

   app.get("/weather",(req,res)=>{
     if(!req.query.address){
      return res.send({
          error:'you must provide a address'
      })        
     }
     geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
         if (error){
             return res.send({error})
         }
         forecast(latitude,longitude,(error,forecastdata)=>{
             if (error){
                 return res.send({error})
             }
             res.send({
                 forecast:forecastdata,
                 location,
                 address:req.query.address
             })
         })
     })

})         
app.get("/product",(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
    
})
app.get('/help/*',(req,res)=>{
    res.render("404",{
        title:"mahn you are in trouble",
        name:"arun",
        errormessage:"no result found"
    })
})
app.get('*',(req,res) => {
    res.render("404",{
       title :'page not found',
       name:"arun",
       errormessage:"404 page"}
       )
}
)
app.listen(port,()=>{
    console.log("server is on port "+ port)
})