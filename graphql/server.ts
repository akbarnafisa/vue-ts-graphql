import { buildSchema } from 'graphql'
import { graphqlHTTP } from 'express-graphql'
import express from 'express'
import cors from 'cors'


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
app.use(cors())

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
      app: async (_: any, ctx: typeof context) => {
        return new Promise(res => {
          setTimeout(() => {
            res(ctx.app)
          }, 500)
        })
      }
    }
  }
}))

app.listen(4000)