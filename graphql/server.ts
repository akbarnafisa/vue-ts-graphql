import { buildSchema } from 'graphql'
import { graphqlHTTP } from 'express-graphql'
import express from 'express'


const schema = buildSchema(`
  type App {
    books:[Book!]!
  }

  type Book {
    id: String!
    title: String!
  }

  type Query {
    app: App!
  }
`)

const app = express()

const context = {
  app: {
    books: [{
      id: 1,
      title: 'title'
    }]
  }
} as const


app.use('/graphql', graphqlHTTP(() => {
  return {
    context,
    graphiql: true,
    schema,
    rootValue: {
      app: (_: any, ctx: typeof context) => {
        return ctx.app
      }
    }
  }
}))

app.listen(4000)