<template>
  <nav>
    <router-link to="/users">Users</router-link>
    <router-link to="/realms">Realms</router-link>
    <router-link to="/logs">Logs</router-link>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Navigation extends Vue { }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
nav {
  flex: 0 0 auto;
  display: flex;
  border-bottom: solid 1px lightgray;
}
a:visited {
  color: black;
}
a {
  padding: 16px;
  display: block;
  text-decoration: none;
  user-select: none;
  box-sizing: border-box;
}
.router-link-active {
  font-weight: bold;
}
</style>
