import { buildSchema } from 'graphql'
import { graphqlHTTP } from 'express-graphql'
import express from 'express'
import cors from 'cors'
import { withCtx } from 'vue'


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

  input BookInput {
    title: String!
  }

  type Mutation {
    createBook(bookInput: BookInput!): Book!
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
      },
      createBook: ({
        bookInput
      }: any,
      ctx: typeof context
      ) => {
        // @ts-ignore
        ctx.app.books.push({
          id: (ctx.app.books.length + 1).toString(),
          title: bookInput.title
        })

        return ctx.app.books[ctx.app.books.length - 1]
      }
    }
  }
}))

app.listen(4000)