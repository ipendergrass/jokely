<template>
  <v-layout column>
    Welcome, {{$store.state.user.info.displayName}}!!
    <v-layout row>
      <v-flex auto>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Jokes</h3>
              <v-list two-line>
                <template v-for="item in $store.state.joke.list">
                  <v-subheader
                    v-if="item.title"
                    :key="item.title"
                  >
                    {{ item.title }}
                    {{ $moment() }}
                  </v-subheader>
                </template>
              </v-list>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="orange">Create Joke</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Ideas</h3>
              <v-list two-line>
                <template v-for="item in ideas">
                  <v-subheader
                    v-if="item.content"
                    :key="item.id">
                    {{ item.content }}
                    {{ $moment(item.created) }}
                  </v-subheader>
                </template>
              </v-list>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex auto>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Dates</h3>
              <div> {{ card_text }} </div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="orange">Add</v-btn>
            <v-btn flat color="orange">See More</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-layout>
</template>
<script>
export default {
  components: {
  },
  name: 'Dashboard',
  data () {
    return {
      card_text: '',
      jokes: [],
      ideas: []
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
    let mis = this
    this.$db.collection('data').doc(this.$firebase.auth().currentUser.uid).collection('jokes')
      .get().then(function (docs) {
        docs.forEach(function (doc) {
          console.log(doc.data())
          mis.$store.commit('ADD_TO_JOKE_LIST', doc.data())
        })
      })

    this.$db.collection('data').doc(this.$firebase.auth().currentUser.uid).collection('ideas')
      .onSnapshot(function (idea) {
        idea.docChanges().forEach(function (change) {
          if (change.type === 'added') {
            mis.ideas.push(change.doc.data())
            console.log(change.doc.data())
          }
          if (change.type === 'modified') {
            console.log(change.doc.data())
          }
          if (change.type === 'removed') {
            console.log(change.doc.data())
          }
        })
      })

    this.$db.collection('data').doc(this.$firebase.auth().currentUser.uid).collection('ideas')
      .get().then(function (ideas) {
        ideas.forEach(function (idea) {
          console.log(idea.data())
          mis.ideas.push(idea.data())
        })
      })
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
