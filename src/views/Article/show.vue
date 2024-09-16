<template>
  <article-show :is-edit="true" />
</template>

<script>
import ArticleShow from './ArticleShow'

export default {
  name: 'ShowForm',
  components: { ArticleShow },
}
</script>

