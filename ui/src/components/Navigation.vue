<template>
  <nav>
    <router-link to="/users">Users</router-link>
    <router-link to="/realms">Realms</router-link>
    <router-link to="/logs">Logs</router-link>
    <span style="flex:1 1 auto;"></span>
    <div class="userinfo" @click="logout">
      <user-icon />
      <span>{{username}}</span>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AuthService } from "../services/auth.service";
import UserIcon from "./UserIcon.vue";

@Component({ components: { UserIcon } })
export default class Navigation extends Vue {
  public username = "";

  public mounted() {
    AuthService.getUserData()
      .then(user => user.name)
      .then(name => (this.username = name));
  }

  public logout() {
    AuthService.logout();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
nav {
  position: sticky;
  top: 0;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  padding: 0 16px;
  background: var(--bg-color);
  color: white;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5);
}
a:visited {
  color: unset;
}
.userinfo {
  display: flex;
  align-items: center;
}
.userinfo span {
  margin-left: 4px;
}
a {
  color: white;
  padding: 16px;
  display: block;
  text-decoration: none;
  user-select: none;
  box-sizing: border-box;
}
.router-link-active {
  font-weight: bolder;
}
</style>
