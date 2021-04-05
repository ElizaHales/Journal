<template>
<div class="admin">
  <h1>Search by date for the entry you want to edit.</h1>
  <div class="edit">
    <div class="form">
      <input v-model="findDate" placeholder="Date">
      <div class="suggestions" v-if="suggestions.length > 0">
        <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectEntry(s)">{{s.date}}</div>
      </div>
    </div>
  </div>
  <div class="upload" v-if="findEntry">
    <h1><br><br>You cannot edit the date, vocabulary, or description inputs - only the entry.</h1>
    <input v-model="findEntry.date" disabled>
    <p></p>
    <input v-model="findEntry.vocab" disabled>
    <p></p>
    <textarea rows="5" cols="80" v-model="findEntry.desc" disabled></textarea>
    <p></p>
    <textarea rows="15" cols="80" v-model="findEntry.entry"></textarea>
    <p></p>
    <div v-if="findEntry">
      <button style="margin-right:10px;" @click="editEntry(findEntry)">Apply Edits</button>
      <button @click="deleteEntry(findEntry)">Delete</button>
    </div>
  </div>
</div>
</template>

<style scoped>
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

.edit {
  display: flex;
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.25em;
}

.form {
  margin-right: 10px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}
</style>

<script>
import axios from 'axios';
export default {
  name: 'Edit',
  data() {
    return {
      data: "",
      file: null,
      entries: [],
      findDate: "",
      findEntry: null,
    }
  },
  computed: {
    suggestions() {
      if (this.findDate.length > 0) {
        let entries = this.entries.filter(entry => entry.date.toLowerCase().startsWith(this.findDate.toLowerCase()));
        return entries.sort((a, b) => a.date > b.date);
      }
      return "";
    }
  },
  created() {
    this.getEntries();
  },
  methods: {
    async upload() {
      try {
        let r1 = await axios.post('/api/entries', {
          desc: this.desc,
          entry: this.entry,
        });
        this.addEntry = r1.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getEntries() {
      try {
        let response = await axios.get("/api/entries");
        this.entries = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectEntry(entry) {
      this.findDate = "";
      this.findEntry = entry;
    },
    async deleteEntry(entry) {
      var r = confirm("Are you sure? This action will permanently delete this journal entry!");
      if (r == true) {
        try {
          await axios.delete("/api/entries/" + entry._id);
          this.findEntry = null;
          this.getEntries();
          return true;
        } catch (error) {
          console.log(error);
        }
      }
    },
    async editEntry(entry) {
      try {
        await axios.put("/api/entries/" + entry._id, {
          date: this.findEntry.date,
          vocab: this.findEntry.vocab,
          desc: this.findEntry.desc,
          entry: this.findEntry.entry,
        });
        this.findEntry = null;
        this.getEntries();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>
