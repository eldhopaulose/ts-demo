import express from "express";

import { User } from "../models/users";

const createUser = async (req: express.Request, res: express.Response) => {
  try {
    const { username, email } = req.body;
    if (!username || !email) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const user = await User.create({ username, email });

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { createUser, getUsers };
