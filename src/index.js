import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { RecoilRoot } from "recoil";

import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: "https://graphql.datocms.com/",
});
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = "6fe615e9e817f7003ca9facbeb9c35";
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById("root")
);
