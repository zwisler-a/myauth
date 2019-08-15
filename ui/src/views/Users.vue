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
import { Component, Vue } from "vue-property-decorator";
import SubList from "../components/SubList.vue";
import { UserService } from "../services/user.service";
import { EventService } from "../services/event.service";
import { AppEvent } from "../model/event.enum";

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
    EventService.subscribe(AppEvent.USER_CHANGED, this.loadUsers.bind(this));
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
