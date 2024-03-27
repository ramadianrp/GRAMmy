const { ObjectId } = require('mongodb');
const { database } = require('../config/mongo');

class Post {
    static postCollection(){
        return database.collection('Post');
    }

    static async findAll() {
        const posts = await this.postCollection().find().toArray();
        return posts;
    }

    static async createOne(payload){
        const newPost = await this.postCollection().insertOne(payload);
        return newPost;
    }

}

module.exports = Post;