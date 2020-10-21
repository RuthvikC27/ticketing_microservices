import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

// ROUTES
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';

import { errorHandler, NotFoundError } from '@rc27tickets/common';

const app = express();
app.set('trust proxy', true);

app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: true
    })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.use('*', async() => {
    throw new NotFoundError();
})

app.use(errorHandler);

const start = () => {
    if(!process.env.JWT_KEY){
        throw new Error("JWT_KEY must be defined!");
    }

    if(!process.env.MONGO_URI){
        throw new Error("JMONGO_URI must be defined!");
    }
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() => console.log("DB connected!"))
    .catch(err => console.log(err))

    app.listen(3000, () => {
        console.log("Listening on port 3000!")
    })
}

start();

