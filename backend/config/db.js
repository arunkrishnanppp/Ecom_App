import mongoose from 'mongoose'
const ConnectDB=async()=>{
    try{
            const conn=await mongoose.connect(process.env.MONGO_URL,{
                useUnifiedTopology:true,
                useNewUrlParser:true,
                useCreateIndex:true
            })
            console.log(conn.connection.host.cyan.underline)
    }catch(error){
        console.log('Error connecting DB'.red.underline.bold)
        process.exit(1)

    }
}

export default ConnectDB