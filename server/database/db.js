import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const Connection = async (username, password) => {
    const URL = `mongodb://${username}:${password}@ac-2dcayhr-shard-00-00.0ikmosr.mongodb.net:27017,ac-2dcayhr-shard-00-01.0ikmosr.mongodb.net:27017,ac-2dcayhr-shard-00-02.0ikmosr.mongodb.net:27017/?ssl=true&replicaSet=atlas-xr9jhe-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true }); //useNewUrlParser: true, useFindAndModify: false 
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('not connected');
    }

};

export default Connection;