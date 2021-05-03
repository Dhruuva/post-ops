<template lang='pug'>
  v-main.grey.lighten-2
    v-container
      v-row
        hello-world
</template>

<script>
  import HelloWorld from '../components/HelloWorld'

  export default {
    name: 'Home',

    components: {
      HelloWorld,
    },
  }
</script>
