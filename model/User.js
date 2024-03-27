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
        const user = await this.userCollection().findOne({
            email: email
        });
        return user
    }

    static async findByUsername(username) {
        const user = await this.userCollection().findOne(
            {
                username: username
            },
            {
                fields: { password: 0 }
            }
        );
        return user
    }

    static async createOne(payload) {
        const newUser = await this.userCollection().insertOne(payload);
        return newUser;
    }

    static async findById(id){
        const user = await this.userCollection().findOne({
            _id: new ObjectId(String(id))
        });
        return user
    }

}

module.exports = User;