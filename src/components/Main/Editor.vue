<template>
  <v-layout column>
    <v-layout row>
      <v-flex>
        <v-text-field
          label="Title"
          v-model="current.title"
          solo
        ></v-text-field>
      </v-flex>
      <v-btn @click="save(current)"><v-icon>cloud_upload</v-icon></v-btn>
    </v-layout>
    <v-flex style="text-align: left">
      <quill-editor v-model="current.content"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)">
      </quill-editor>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  components: {
  },
  name: 'Editor',
  data () {
    return {
      right: null,
      editor: null,
      current: {
        id: null,
        title: null,
        content: '<h1 class="ql-align-center"><span class="ql-font-serif"><span class="ql-cursor"></span>I am Example 3!</span></span></h1>'
      },
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            // [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            // [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['link', 'video']
          ]
        }
      }
    }
  },
  mounted () {
    let mis = this
    this.current.id = this.$store.state.joke.current.id
    this.current.title = this.$store.state.joke.current.title
    this.current.content = this.$store.state.joke.current.content
    console.log(this.current)
    this.$db.collection('data').doc(this.$firebase.auth().currentUser.uid).collection('jokes').doc(this.current.id).collection('content').get().then(function (snap) {
        let document = snap.docs[0].data()
        console.log(document)
        // mis.$store.commit('SET_CURRENT_JOKE_CONTENT', document.body)
        mis.current.content = document.body
      })
  },
  beforeDestroy () {
  },
  computed: {
  },
  methods: {
    save (current) {
      console.log('entering save')
      let mis = this
      let data = null
      let timestamp = Date.now()
      if (current.id === null) {
        data = {
          updated: timestamp,
          title: current.title,
          created: timestamp
        }
        this.$db.collection('data').doc(this.$firebase.auth().currentUser.uid).collection('jokes').add(data).then(function (docRef) {
         console.log('Document written with ID: ', docRef.id)
         // data.id = docRef.id
         docRef.collection('content').add({body: current.content}).then(() => {           
          console.log('exiting save')
         }).catch((error) => {
           console.log('didn\'t work')
         })
        }).catch(function (error) {
          console.log('I\'m here')
          console.log(error)
        })
        // this.$firebase.database().ref(refString2).doc({body: data.content})
        // ref.set(data)
      } else {
        let refString = '/data/' + this.$firebase.auth().currentUser.uid + '/jokes/' + this.current.id
        ref = this.$firebase.database().ref(refString).push()
        data = {
          // id: current.id,
          updated: timestamp,
          title: current.title
        }
        ref.update(data).then(() => {
          ref.collection('content').add({body: current.content})
        })
      }
      // console.log(this.$db)
    },
    onEditorBlur (editor) {
      // console.log('editor blur!', editor)
    },
    onEditorFocus (editor) {
      // console.log('editor focus!', editor)
    },
    onEditorReady (editor) {
      // console.log('editor ready!', editor)
    },
    customButtonClick () {
      alert(`You can custom the button and listen click event to do something...\n你可以定义一些自定义按钮做你想做的事，如上传图片至第三方存储再插入内容区...等等`)
    }
  },
  created () {
    console.log(this.$store.state.user.info)
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
