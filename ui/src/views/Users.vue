<template>
  <main>
    <sub-list
      v-if="users.length"
      v-on:clicked="showUser"
      v-bind:items="users"
      searchPlaceholder="User"
    ></sub-list>
    <div v-else>Loading...</div>
    <div class="seperator"></div>
    <router-view :key="$route.fullPath"></router-view>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SubList from '../components/SubList.vue';
import { UserService } from '../services/user.service';

@Component({ components: { SubList } })
export default class Users extends Vue {
  public users: any[] = [];
  private userService: UserService;
  constructor() {
    super();
    this.userService = UserService.getInstance();
  }

  public mounted() {
    this.loadUsers();
  }

  public async showUser(realm: any) {
    try {
      await this.$router.push({ path: `/users/${realm.id}` });
    } catch (e) {
      e = e;
    }
  }

  private async loadUsers() {
    this.users = await this.userService.getUsers();
  }
}
</script>
<style scoped>
main {
  display: flex;
  flex: 1 1 auto;
  padding: 16px;
}
.seperator {
  border: solid 1px lightgray;
  margin: -16px 16px -16px 16px;
}
</style>
