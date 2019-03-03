<template>
  <v-layout row justify-start style="margin-left: 80px">
    <v-navigation-drawer
      column
      v-model="drawer"
      :mini-variant="true"
      absolute
      dark
      stateless
      disable-resize-watcher
      :hide-overlay="true"
      style="width:80px">
      <v-list class="pa-1">

        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img :src="this.$store.state.user.info.photoUrl">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ this.$store.state.user.info.displayName }}</v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider light></v-divider>

        <v-list-tile
          v-for="item in items"
          :key="item.title"
          @click="onClick(item)">
          <v-list-tile-action>
            <v-icon :style="activeColor(item)">{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-layout column>
      <router-view/>
    </v-layout>
  </v-layout>
</template>
<script>
export default {
  components: {
  },
  name: 'HelloWorld',
  data () {
    return {
      drawer: true,
      items: [
        { title: 'Dashboard', icon: 'dashboard' },
        { title: 'Ideas', icon: 'highlight' },
        { title: 'Jokes', icon: 'mic' },
        { title: 'Sets', icon: 'library_books' },
        { title: 'Editor', icon: 'create' },
        { title: 'Logout', icon: 'clear' }
      ],
      mini: true,
      right: null
    }
  },
  mounted () {
  },
  beforeDestroy () {
  },
  computed: {
  },
  methods: {
    activeColor (item) {
      if (this.$route.name === item.title) {
        return 'color: orange'
      }
    },
    onClick (item) {
      let myThis = this
      if (item.title === 'Logout') {
        this.$firebase.auth().signOut().then(function () {
          myThis.$router.push({name: 'Login'})
        }).catch(function (error) {
          console.log(error)
        })
      } else {
        this.$router.push({name: item.title})
      }
    }
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
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
