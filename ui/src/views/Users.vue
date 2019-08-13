<template>
  <main>
    <sub-list
      v-on:clicked="showUser"
      v-bind:items="users"
      createLink="/users/create"
      searchPlaceholder="User"
    ></sub-list>
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
}
</style>
