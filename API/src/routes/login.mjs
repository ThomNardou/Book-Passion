import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../db/sequelize.mjs";
import { privateKey } from "../auth/private_key.mjs";

const loginRouter = express();

loginRouter.post("/", (req, res) => {
User.findOne({ where: { username: req.body.username } })
.then((user) => {
if (!user) {
const message = `Requested user does not exist`;
return res.status(404).json({ message });
}
bcrypt
.compare(req.body.password, user.password)
.then((isPasswordValid) => {
if (!isPasswordValid) {
const message = `The password is incorrect.`;
return res.status(401).json({ message });
} else {
// JWT
const token = jwt.sign({ userId: user.id }, privateKey, {
expiresIn: "1y",
});
const message = `User successfully logged in`;
return res.json({ message, data: user, token });
}
});
})
.catch((error) => {
const message = `The user could not be connected. Please try again in a few moments`;
return res.json({ message, data: error });
});
});
export { loginRouter };