<template>
  <v-layout column>
      Welcome, {{$store.state.user.info.displayName}}!!
  </v-layout>
</template>
<script>
export default {
  components: {
  },
  name: 'Dashboard',
  data () {
    return {
    }
  },
  mounted () {
  },
  beforeDestroy () {
  },
  computed: {
  },
  methods: {
  },
  created () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
