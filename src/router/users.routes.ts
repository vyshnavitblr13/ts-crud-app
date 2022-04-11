import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import User from "../models/users";


export const usersRouter = express.Router();

usersRouter.use(express.json());

usersRouter.post("/createUser", async (req: Request, res: Response) => {
    try {
        const newUser = req.body as User;
        const result = await collections.users?.insertOne(newUser) 

        result
            ? res.status(201).send(`Successfully created a new user with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new user.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});

usersRouter.get("/users", async (_req: Request, res: Response) => {
    try {
       const users = (await collections.users?.find({}).toArray()) 

        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

usersRouter.get("/user/detail/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id
    try {
   
        const query = { _id: new ObjectId(id) };
        const result = await collections.users?.findOne(query) 

        if (result) {
            res.status(200).send(result);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

usersRouter.put("/editUser/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedUser: User = req.body as User;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.users?.updateOne(query, {$set : updatedUser}) 

        result
            ? res.status(200).send(`Successfully updated user with id ${id}`)
            : res.status(304).send(`User with id: ${id} not updated`);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});

usersRouter.delete("/removeUser/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.users?.deleteOne(query) //.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed user with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove user with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`user with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});