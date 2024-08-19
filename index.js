const express = require("express")
const http = require("http")
const {ApolloServer} = require("apollo-server")

const app = express()

const typeDefs = `
type User{
    name: String!,
    age: Int
    address: Address
},

type Address{
    city: String,
    country: String,
    postal_address: Int
}

type Query{
    getUser: User
}`

const resolvers = {
    Query: {
        getUser: (obj, args, context, info) => {
            return {name: "Abdul Muazzam", age: 27, address: {city: "LHR", country: "PAK", postal_address: 1234}}
        }
    },
    User: {
        address(obj, args, context, info){
            console.log(obj)
            return {city: "LHR1", country: "PAK1", postal_address: 1234}
        }, 
        age(obj, args, context, info){
            return 30
        },
        name(obj, args, context, info){
            return "MOZM"
        }
    },
    Address: {
        city(obj, args, context, info){
            return "LAHORE"
        },
        country(obj, args, context, info){
            return "PAKISTAN"
        },
        postal_address(obj, args, context, info){
            return 7777
        },
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const url =  server.listen(8000)
console.log(url)


// const server = http.createServer((res, req) => {
// req.end("Hello")
// })
// server.listen(8000, () => console.log("Server listening on port 8000"))


