export default function Schemah() {
  return `#graphql


    type Game{
        id: ID!
        name: String
        type: String
        reviews: [Review]
    }
    
    type Review{
        id: ID!
        stars: Int
        Comments: String
    }
    
    type Author{
        id: ID!
        name: String
        contactNumber: Int
    }
    `;
}
