const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const env = require("dotenv");

async function startServer() {
  env.config();

  const db = {
    games: [
      { id: 1, name: "Warcraft", type: "Computer" },
      { id: 2, name: "Stronghold Crusader", type: "Computer" },
      { id: 3, name: "Football", type: "Physical" },
      { id: 4, name: "PubG", type: "Computer" },
      { id: 5, name: "Cricket", type: "Physical" },
    ],
    authors: [
      { id: 1, name: "User 1", contactNumber: 111111111 },
      { id: 2, name: "User 2", contactNumber: 222222222 },
      { id: 3, name: "User 3", contactNumber: 333333333 },
      { id: 4, name: "User 4", contactNumber: 444444444 },
    ],
    reviews: [
      { id: 1, stars: 3, comments: "Good", game_id: 2, author_id: 3 },
      { id: 2, stars: 2, comments: "Fair", game_id: 1, author_id: 1 },
      { id: 3, stars: 0, comments: "Bad", game_id: 5, author_id: 3 },
      { id: 4, stars: 5, comments: "Excellent", game_id: 3, author_id: 4 },
      { id: 5, stars: 4, comments: "Fair", game_id: 1, author_id: 3 },
    ],
  };

  const typeDefs = `#graphql
    type Game{
        id: ID!
        name: String
        type: String
        oldField: String @deprecated(reason: "This field will soon be removed!")
        reviews: [Review]
    }
    
    type Review{
        id: ID!
        stars: Int
        comments: String
        authors: [Author]
    }
    
    type Author{
        id: ID!
        name: String
        contactNumber: Int
    }
    
    type Query{
        games: [Game]
        reviews: [Review]
        authors: [Author]
        game(id: ID!): Game
        review(id: ID!): Review
        author(id: ID!): Author
    }
    `;

  const resolvers = {
    Query: {
      games: () => db.games,
      reviews: () => db.reviews,
      authors: () => db.authors,
      game: (_, args) => db.games.find((game) => game.id === Number(args.id)),
      review: (_, args) =>
        db.reviews.find((review) => review.id === Number(args.id)),
      author: (_, args) =>
        db.authors.find((author) => author.id === Number(args.id)),
    },
    Game: {
      reviews: (parent, args, context, _) => {
        return db.reviews.filter((review) => review.game_id === parent.id);
      },
    },
    Review: {
      authors: (parent, args, context, _) => {
        return db.authors.filter((author) => author.id === parent.author_id);
      },
    },
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 3000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

startServer();
