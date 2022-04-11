"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const database_service_1 = require("../services/database.service");
exports.usersRouter = express_1.default.Router();
exports.usersRouter.use(express_1.default.json());
exports.usersRouter.post("/createUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const newUser = req.body;
        const result = yield ((_a = database_service_1.collections.users) === null || _a === void 0 ? void 0 : _a.insertOne(newUser));
        result
            ? res.status(201).send(`Successfully created a new user with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new user.");
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
}));
exports.usersRouter.get("/users", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const users = (yield ((_b = database_service_1.collections.users) === null || _b === void 0 ? void 0 : _b.find({}).toArray()));
        res.status(200).send(users);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.usersRouter.get("/user/detail/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const id = (_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield ((_d = database_service_1.collections.users) === null || _d === void 0 ? void 0 : _d.findOne(query));
        if (result) {
            res.status(200).send(result);
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
}));
exports.usersRouter.put("/editUser/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    const id = (_e = req === null || req === void 0 ? void 0 : req.params) === null || _e === void 0 ? void 0 : _e.id;
    try {
        const updatedUser = req.body;
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield ((_f = database_service_1.collections.users) === null || _f === void 0 ? void 0 : _f.updateOne(query, { $set: updatedUser }));
        result
            ? res.status(200).send(`Successfully updated user with id ${id}`)
            : res.status(304).send(`User with id: ${id} not updated`);
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
}));
exports.usersRouter.delete("/removeUser/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h;
    const id = (_g = req === null || req === void 0 ? void 0 : req.params) === null || _g === void 0 ? void 0 : _g.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield ((_h = database_service_1.collections.users) === null || _h === void 0 ? void 0 : _h.deleteOne(query)); //.deleteOne(query);
        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed user with id ${id}`);
        }
        else if (!result) {
            res.status(400).send(`Failed to remove user with id ${id}`);
        }
        else if (!result.deletedCount) {
            res.status(404).send(`user with id ${id} does not exist`);
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
}));
