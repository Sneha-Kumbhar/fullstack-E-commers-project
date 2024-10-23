const mongoose=require('mongoose')

const connect=()=>{
    try {
        mongoose.connect('mongodb://localhost:27017/project')
        console.log('database has been connected')
    } catch (error) {
        console.log('error')
    }

}
module.exports={connect}
