import { ObjectId } from "mongodb";

export default class User {
    constructor(public user_name: string, 
                    public address: string, 
                    public job: string, 
                    public age: number, 
                    public id?: ObjectId) {}
}