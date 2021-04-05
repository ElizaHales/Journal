<template>
<div id="app">
  <div class="header">
    <div class="menu">
      <h2><router-link to="/new">New Entry</router-link></h2>
    </div>
    <router-link to="/">
      <div class="title">
        <h1>Journal</h1>
        <img src="/journal.png">
      </div>
    </router-link>
    <div class="menu">
      <h2><router-link to="/edit">Edit Entry</router-link></h2>
    </div>
  </div>
  <div class="content">
    <router-view />
  </div>
  <div class="footer">
    <a href="https://github.com/BYU-CS-260-Winter-2021/lab-4-museum-of-ordinary-objects-ElizaHales">Eliza's GitHub Repository</a>
  </div>
</div>
</template>

<style>
html {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}

/* Header */
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 100px 0px 100px;
  background-color: #FFFACD;
  color: #000000;
}

.title {
  margin-top: 5px;
}

.title h1 {
  color: #000;
  font-size: 30px;
  text-align: center;
}

.menu {
  margin-top: 6px;
}

.menu h2 {
  color: #000;
  font-size: 18px;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}

/* Footer */
.footer {
  height: 50px;
  padding: 20px 100px 0px 100px;
  background: #e3e3e3;
  font-size: 20px;
}

.footer a {
  color: #000;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}
</style>
