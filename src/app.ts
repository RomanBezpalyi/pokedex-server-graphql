import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import { GraphQLError } from "graphql/error/GraphQLError";
import { config } from "dotenv";

import graphqlSchema from "./graphql/schema";
import graphqlResolver from "./graphql/resolvers";
import { CustomError } from "./interfaces/error";

config();

const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    console.log("req", req);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  })
  .use(
    "/graphql",
    graphqlHTTP({
      schema: graphqlSchema,
      rootValue: graphqlResolver,
      graphiql: true,
      formatError(err: GraphQLError) {
        if (!err.originalError) {
          return err;
        }
        const data = (err.originalError as CustomError).data;
        const message = err.message || "An error occurred.";
        const code = (err.originalError as CustomError).code || 500;
        return { message: message, status: code, data: data };
      },
    })
  );

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rojdcuc.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("DB Connected.");
    app.listen(3030);
  })
  .catch((err) => console.log(err));
