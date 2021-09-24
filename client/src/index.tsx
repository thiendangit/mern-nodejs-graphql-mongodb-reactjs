import React from "react";
import ReactDOM from "react-dom";
import {ApolloProvider} from "@apollo/client";
import App from "./App";
import {client} from "./services/apollo";

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById("root")
);
