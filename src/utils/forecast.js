const request=require('request')
const forecast=(latitude,longitude,callback) =>{
    const url="http://api.weatherstack.com/current?access_key=af17202b120aacf37f6d9e01bfdb4a31&query="+latitude+","+longitude+""
    request({url,json:true},(error,{body})=>{
        if (error){
            callback("unable to connect to network",undefined)
        }
        else if(body.error){
            callback("cordinate error ,try another one",undefined)
        }
        else{
            callback(undefined,"temperature is  " + body.current.temperature +" feel like "+body.current.feelslike)
        }
    } )


}
module.exports=forecast