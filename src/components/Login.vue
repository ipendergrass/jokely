<template>
  <v-layout>
    <v-btn @click="Login('facebook')">Facebook</v-btn>
    <v-btn @click="Login('twitter')">Twitter</v-btn>
    <v-btn @click="Login('google')">Google</v-btn>
  </v-layout>
</template>
<script>
export default {
  components: {
  },
  name: 'Login',
  data () {
    return {
      google: null
    }
  },
  mounted () {
  },
  beforeDestroy () {
  },
  computed: {
  },
  methods: {
    Login (service) {
      switch (service) {
        case 'twitter':
          this.provider = new this.$firebase.auth.TwitterAuthProvider()
          break
        case 'facebook':
          this.provider = new this.$firebase.auth.FacebookAuthProvider()
          break
        case 'google':
          this.provider = new this.$firebase.auth.GoogleAuthProvider()
          break
        default:
          break
      }
      if (this.provider !== undefined && this.provider !== null) {
        this.completeLogin(this.provider)
      }
    },
    completeLogin (provider) {
      let myThis = this
      this.$firebase.auth().signInWithPopup(provider).then(function (result) {
        // The signed-in user info.
        let user = result.user
        console.log(user)

        // This gives you a Google Access Token. You can use it to access the Google API.
        let token = result.credential.accessToken
        console.log(token)

        if (user.providerData[0].providerId === 'twitter.com') {
          let secret = result.credential.secret
          console.log(secret)
        }

        myThis.$store.commit('SET_USER_INFO', { photoUrl: user.providerData[0].photoURL, displayName: user.providerData[0].displayName })
        myThis.$router.push({name: 'Dashboard'})
        // ...
      }).catch(function (error) {
        // Handle Errors here.
        let errorCode = error.code
        console.log(errorCode)
        // let errorMessage = error.message
        // // The email of the user's account used.
        // let email = error.email
        // // The firebase.auth.AuthCredential type that was used.
        // let credential = error.credential
        // // ...
      })
    }
  },
  created () {
    console.log(this.$firebase)
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
