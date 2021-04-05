<template>
<div class="admin">
  <h1>New Entry</h1>
  <div class="add">
    <div class="form">
      <div class="heading"><h2>The date of the journal entry<em> (not necessarily today's date)</em></h2></div>
      <input v-model="date" placeholder="Date">
      <p><br></p>
      <div class="heading"><h2>A word, phrase, or saying you want to use in your journal entry<em> (warning: entry must include this vocabulary)</em></h2></div>
      <input v-model="vocab" placeholder="Vocabulary">
      <p><br></p>
      <div class="heading"><h2>A quick description of what you want to write about<em> (optional)</em></h2></div>
      <textarea rows="5" cols="80" v-model="desc" placeholder="Description"></textarea>
      <p><br></p>
      <div class="heading"><h2>Write your entry here<em> (reminder: don't forget to include the vocabulary in your entry)</em></h2></div>
      <textarea rows="15" cols="80" v-model="entry" placeholder="Entry"></textarea>
      <p></p>
      <button @click="add">Add</button>
      <p></p>
      <div v-if="addEntry">
        <h2 style="font-size: 20px;">Successfully added the entry to your journal!</h2>
      </div>
      <div v-if="unsuccessful">
        <h2 style="color: red; font-size: 20px;">Unsuccessful! Please include the vocabulary in your entry.</h2>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
h1 {
  font-size: 25px;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
  background-color: #FFFACD;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add {
  display: flex;
}

/* Form */
input, textarea, select, button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.25em;
}

.form {
  margin-right: 50px;
}
</style>

<script>
import axios from 'axios';
export default {
  name: 'New',
  data() {
    return {
      date: "",
      vocab: "",
      desc: "",
      entry: "",
      addEntry: null,
      unsuccessful: null,
    }
  },
  methods: {
    async add() {
      try {
        if (this.entry.includes(this.vocab)) {
        let r1 = await axios.post('/api/entries', {
          date: this.date,
          vocab: this.vocab,
          desc: this.desc,
          entry: this.entry,
        });
          this.addEntry = r1.data;
          this.unsuccessful = null;
        } else {
          this.addEntry = null;
          this.unsuccessful = "unsuccessful";
        }
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>
