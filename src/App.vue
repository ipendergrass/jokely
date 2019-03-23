<template>
  <div id="app">
    <v-navigation-drawer v-if="$store.state.user.info !== null"
      app
      column
      v-model="drawer"
      :mini-variant="true"
      dark
      stateless
      disable-resize-watcher
      :hide-overlay="true">
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
    <v-content>
      <v-container fluid style="height: 100vh">
        <v-layout column  class="fullWorkspace" >
          <V-flex class="fullWorkspace" >
            <router-view/>
          </v-flex>
          <v-flex align-end v-if="$store.state.user.info !== null">
            <v-layout row>
              <v-text-field v-model="newIdea" align-content-end placeholder="Got a new idea?" solo></v-text-field>
              <v-btn fab dark color="orange" @click="uploadIdea" style="top: -10px">
                <v-icon dark>cloud_upload</v-icon>
              </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      newIdea: '',
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
  methods: {
    uploadIdea () {
      let mis = this
      this.$db.collection('data').doc(this.$firebase.auth().currentUser.uid).collection('ideas').add({ content: this.newIdea, created: Date.now() }).then(function (docref) {
        mis.newIdea = ''
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    onClick (action) {
      console.log(action)
    },
    activeColor (item) {
      if (this.$route.name === item.title) {
        return 'color: orange'
      }
    },
    onClick (item) {
      let myThis = this
      if (item.title === 'Logout') {
        this.$firebase.auth().signOut().then(function () {
          // Logged out, so set user info back to null
          myThis.$store.commit('SET_USER_INFO', null)

          // Route back to Login page
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
    console.log(this.$router)
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  height: 100vh
}

.fullWorkspace {
  height: 100%
}
</style>
