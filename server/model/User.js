const { ObjectId } = require('mongodb');
const { database } = require('../config/mongo');

class User {
    static userCollection() {
        return database.collection('User');
    }

    static async findAll() {
        const users = await this.userCollection().find().toArray();
        return users;
    }

    static async findByEmail(email) {
        const user = await this.userCollection().findOne(
            {
                email: email
            },
            {
                fields: { "password": 0 }
            }
        );
        return user
    }

    static async findByUsername(username) {
        const user = await this.userCollection().findOne(
            {
                username: username
            },
            {
                fields: { "password": 0 }
            }
        );
        return user
    }

    static async createOne(payload) {
        const newUser = await this.userCollection().insertOne(payload);
        return newUser;
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
                    from: "Follow",
                    localField: "_id",
                    foreignField: "followingId",
                    as: "followers",
                },
            },
            {
                $lookup: {
                    from: "Follow",
                    localField: "_id",
                    foreignField: "followerId",
                    as: "followings",
                },
            },
            {
                $project: {
                    password: 0
                },
            },
        ];

        const cursor = this.userCollection().aggregate(agg);
        const result = await cursor.toArray();
        // console.log(result[0]);
        return result[0];
    }

}

module.exports = User;