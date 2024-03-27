const { ObjectId } = require('mongodb');
const { database } = require('../config/mongo');

class Post {
    static postCollection() {
        return database.collection('Post');
    }

    static async findAll() {
        const agg = [
            {
                $sort: {
                    createdAt: -1,
                },
            },
            {
                $lookup: {
                    from: "User",
                    localField: "authorId",
                    foreignField: "_id",
                    as: "author",
                },
            },
        ];
        const cursor = this.postCollection().aggregate(agg);
        const result = await cursor.toArray();

        return result;
    }

    static async createOne(payload) {
        const newPost = await this.postCollection().insertOne(payload);
        return newPost;
    }

    static async findById(id) {
        const agg = [
            {
                $match: {
                    _id: new ObjectId(String(id))
                },
            },
            {
                $lookup: {
                    from: "User",
                    localField: "authorId",
                    foreignField: "_id",
                    as: "author",
                },
            },
        ];
        const cursor = this.postCollection().aggregate(agg);
        const result = await cursor.toArray();
        // console.log(result, "<<< result");

        return result;
    }


}

module.exports = Post;