<template>
  <div class="hello">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-5">
          <!-- Streamer information -->
          <p>
            <input type="text" v-model="streamer_name"/>
            <button @click="_getStreamer()">Display streamer informations</button>
          </p>
          <template v-if="streamer.display_name">
            <div id="streamer" >
              <div id="informations">
                <img class="logo" :src="streamer.logo"/>
                <h2>{{ streamer.display_name }}</h2>
              </div>
              <ul>
                <li>
                  {{streamer.broadcaster_language}}
                </li>
                <li>
                  Views : {{streamer.views}}
                </li>
                <li>
                  Followers : {{streamer.followers}}
                </li>
                <li>
                  <a :href="streamer.url">Link</a>
                </li>
              </ul>
              <ul id="channel_panels">
                <li v-for="i in streamer.panels">
                  <div class="js-panel-content">
                      <div v-if="i.data.title" class="part">
                          <h3 class="title">{{ i.data.title }}</h3>
                      </div>
                      <div v-if="i.data.image" class="part">
                          <a v-if="i.data.link" class="link" rel="noopener noreferrer nofollow" target="_blank" :href="i.data.link">
                              <img :src="i.data.image">
                          </a>
                          <img v-else="" :src="i.data.image">
                          <!---->
                      </div>
                      <div v-if="i.html_description" v-html="i.html_description" class="part description">
                      </div>
                      <div v-else-if="i.data.description" class="part description">
                          <p>{{ i.data.description }}</p>
                      </div>
                      <!---->
                      <!---->
                  </div>
                </li>
              </ul>
            </div>
          </template>
          <template v-else-if="streamer_name_checked">
            <h2>{{ streamer_name_checked }} not found</h2>
          </template>
        </div>

        <div class="col-sm-7">
          <!-- Streamers list -->
          <p>
            <button v-if="show_streamers_list" @click="toggleStreamersList()">Hide Streamers list</button>
            <button v-if="show_streamers_list" @click="refreshStreamersList()">Refresh Streamers list</button>
            <button v-else="show_streamers_list" @click="toggleStreamersList()">Show streamers list</button>
          </p>
          <template v-if="show_streamers_list">
            <ul id="channels" class="list-group">
              <li class="list-group-item" @click="getStreamer(i.name)" v-for="i in streamers">
                <ul>
                  <li>
                    <img class="logo" :src="i.logo"/>
                  </li>
                  <li>
                    {{i.display_name}}
                  </li>
                  <li>
                    {{i.broadcaster_language}}
                  </li>
                  <li>
                    Views : {{i.views}}
                  </li>
                  <li>
                    Followers : {{i.followers}}
                  </li>
                  <li>
                    <a :href="i.url">Link</a>
                  </li>
                </ul>
              </li>
            </ul>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
  name: 'hello',
  computed: {
    ...mapGetters({
      streamer: 'streamer',
      streamers: 'streamers',
    })
  },
  methods: {
    ...mapActions({
      getStreamer: 'getStreamer',
      getAllStreamers: 'getAllStreamers'
    }),
    _getStreamer(){
      let streamer_name = this.streamer_name.toLowerCase();
      if(streamer_name != ""){
        this.streamer_name_checked = streamer_name;
        this.getStreamer(streamer_name);
      }
    },
    refreshStreamersList(){
      if(this.show_streamers_list){
        this.getAllStreamers();
      }
    },
    toggleStreamersList(){
      this.streamers_list_showed_before = true
      this.show_streamers_list = !this.show_streamers_list;
      this.refreshStreamersList();
    }
  },
  data () {
    return {
      msg: 'Welcome to Twitch crawler',
      streamer_name: "",
      streamer_name_checked: "",
      show_streamers_list: false,
      streamers_list_showed_before: false
    }
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

#streamer{
  height: 70vh;
  overflow-y: scroll;
}

#informations h2{
  display: inline-block;
  margin: 0;
}

#informations img{
  display: inline-block;
}

#channel_panels > li {
  display: inline-block;
  margin: 0 10px;
}

#channels ul > li {
  display: inline-block;
  margin: 0 10px;
}

#channels{
  height: 70vh;
  overflow-y: scroll;
}

#channel_panels{
  position: relative;
  border: 1px #888 solid;
}

.list-group-item{
  cursor: pointer;
}

.list-group-item:hover{
  background-color: #eee;
}

.logo{
  width : 100px;
}

a {
  color: #42b983;
}
</style>
