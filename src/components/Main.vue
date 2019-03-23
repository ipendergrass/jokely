<template>
  <v-layout row justify-start v-if="$store.state.user.info !== null">
    <router-view/>
  </v-layout>
</template>
<script>
export default {
  components: {
  },
  name: 'Main',
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
    console.log(this.$store.state.user.info)
    console.log(this.$children)
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
  margin: 0 0px;
}
a {
  color: #42b983;
}
</style>
