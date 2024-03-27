const { ObjectId } = require('mongodb');
const { database } = require('../config/mongo');

class Follow {
    static postCollection(){
        return database.collection('Follow');
    }

    static async findAll() {
        const follows = await this.postCollection().find().toArray();
        return follows;
    }

    static async createOne(payload){
        const newFollow = await this.postCollection().insertOne(payload);
        return newFollow;
    }
    
    static async insertOne(payload){
        const newFollow = await this.postCollection().insertOne(payload);
        return newFollow;
    }

}

module.exports = Follow;