<template>
  <div>
    <form @submit.prevent="submit">
      <label for="title">Title:</label>
      <input type="text" v-model="title" />
    </form>

  </div>
</template>

<script setup lang="ts">
import { gql, useMutation } from '@urql/vue'
import { ref } from 'vue';

const CreateBook = gql`
mutation CreateBook($title: String!) {
  createBook(bookInput: {
    title: $title
  }) {
    id
    title
  }
}
`

const createBook = useMutation(CreateBook)

const title = ref('')
const submit = () => {
  createBook.executeMutation({
    title: title.value
  })
}
</script>
