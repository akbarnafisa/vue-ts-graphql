<template>
  <div v-if="showBooks.fetching.value">Loading...</div>
  <div v-else-if="showBooks.error.value">
    {{ showBooks.error.value }}
  </div>
  <div v-else>
    <ul>
      <li v-for="book of showBooks.data.value.app.books">
        {{ book.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { gql, useQuery } from '@urql/vue'

const ShowBooks = gql`
  query ShowBooks {
    app {
      books {
        id
        title
      }
    }
  }
`

const showBooks = useQuery({
  query: ShowBooks,
})
</script>
