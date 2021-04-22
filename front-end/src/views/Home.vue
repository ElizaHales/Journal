<template>
<div v-if="user" class="home">
  <div v-for="entry in entries" :key="entry.id">
    <h1>{{entry.date}}</h1>
    <p style="font-size: 18px;">{{entry.entry}}</p>
    <p><br><br><br></p>
  </div>
</div>
<Login v-else />
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import Login from "@/components/Login.vue";
export default {
  name: 'Home',
  components: {
    Login,
  },
  data() {
    return {
      entries: [],
    }
  },
  created() {
    this.getEntries();
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  methods: {
    async getEntries() {
      try {
        let response = await axios.get("/api/entries");
        let entries = response.data;
        entries = entries.filter(entry => entry.entry.includes(entry.vocab));
        this.entries = entries;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.image h1 {
  font-style: bold;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
</style>
