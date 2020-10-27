import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import jwt from "jsonwebtoken";

let mongo: any;

declare global{
  namespace NodeJS{
    interface Global{
      signin(): string[]
    }
  }
}

beforeAll(async () => {
  mongo = new MongoMemoryServer();
  const mongoURI = await mongo.getUri();

  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
})

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
})

global.signin = () => {
  // Build a JWT payload. { id, email }

  const payload = {
    id: "1ajsdnkigwee",
    email: "test@test.com"
  }
  // Create the jwt
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build a session object. { jwt: MY_JWT}
  const session = { jwt: token }

  // turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // return a string thats the cookie with the encoded data
  return [`express:sess=${base64}`];
}