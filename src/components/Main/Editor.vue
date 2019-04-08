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
        content: null
      },
      id: null,
      title: 'New Joke',
      msg: 'Welcome to Your Vue.js App',
      name: 'Editor',
      content: `<h1 class="ql-align-center">
                <span class="ql-font-serif"><span class="ql-cursor"></span>I am Example 3!</span></span>
                </h1>
                <p><br></p>
                <p><strong class="ql-font-serif">Whenever you play the game of thrones, you either win or die. There is no middle ground.</strong></p>
                <p><br></p>
                <p><u class="ql-font-serif">Some war against sword and spear to win, and the others the crow and the paper to win.</u></p>
                <p><br></p>
                <p><em class="ql-font-serif">Dead history is write in ink, the living sort in blood.</em></p>
                <p><br></p>
                <p><span class="ql-font-serif" style="color: rgb(0, 102, 204);">They're only numbers. Numbers on paper. Once you understand that, it's easy to make them behave.</span></p>
                <p><br></p>
                <p><span class="ql-font-serif">Every time we deal with an enemy, we create two more.</span></p>
                <p><br></p>
                <p><span class="ql-font-serif">So the king has decreed. The small council consents.</span></p>
                <p><br></p>
                <p><span class="ql-font-serif">Chaos not is a pit, chaos is a ladder.</span></p>
                <p><br></p>
                <p><span class="ql-font-serif">A chain needs all sorts of metals, and a land needs all sorts of people.</span></p>
                <p><br></p>
                <p><span class="ql-font-serif">When the snows fall and the white winds blow, the lone wolf dies, but the pack survives.</p>
                `,
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
         docRef.collection('content').add({body: current.content})
        }).catch(function (error) {
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
      console.log('exiting save')
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
