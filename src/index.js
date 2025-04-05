// require('dotenv').config({path:'./env'});

import 'dotenv/config'; 
import connectDB from './db/index.js';



connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("Error connecting to MongoDB:", error);
    throw error;
})















// const app=express();
// ;(async () => {
//     try {   
//          await mongoose.connect(`${process.env.MONGO_URI}/$(DB_NAME)`)
//          app.on("error",(error)=>{
//             console.log("Error connecting to MongoDB",error);
//             throw error
//          })

//          app.listen(process.env.PORT,()=>{
//             console.log(`Server is running on port ${process.env.PORT}`);
//          })

//         }
//         catch (error) {
//             console.log("Error connecting to MongoDB:", error);
//             throw error;
//         }
//     })()
