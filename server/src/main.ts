import {ApolloServer} from "apollo-server-express";
import * as mongoose from "mongoose";
import 'dotenv/config'
import {resolvers} from "./graphql/resolvers";
import {loadSchemaSync} from "@graphql-tools/load";
import {GraphQLFileLoader} from '@graphql-tools/graphql-file-loader';
import {addResolversToSchema} from "@graphql-tools/schema";
import {ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core';
import {createServer} from 'http';
import {SubscriptionServer} from 'subscriptions-transport-ws';
import {execute, subscribe} from 'graphql';
import {PubSub} from 'graphql-subscriptions';
import express = require("express");
import cors = require("cors");

export const pubsub = new PubSub();

(async function () {
  const schema = loadSchemaSync("src/**/*.graphql", {
    loaders: [new GraphQLFileLoader()],
  });

  const corsOptions = {
    // origin: 'http://localhost:8080', your_url
    credentials: true // <-- REQUIRED backend setting
  };

  const app = express();
  app.use(cors(corsOptions));
  const httpServer = createServer(app);

  const schemaWithResolvers = addResolversToSchema({
    schema,
    resolvers,
  });

  const server = new ApolloServer({
    schema: schemaWithResolvers,
    context: (res) => ({res}),
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            }
          };
        }
      }
    ],
  });

  await server.start();
  server.applyMiddleware({app});

  const subscriptionServer = SubscriptionServer.create(
    {
      schema: schemaWithResolvers,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: server.graphqlPath,
    },
  );

  mongoose.connect(process.env.MONGODB_URL, async (err) => {
    if (err) throw err;
    console.log("connected to db successfully!")
    httpServer.listen({port: 3000}, () => {
      console.log(`Server is now running on http://localhost:${3000}/graphql`)
    })
  })
})();
