<template>
  <section>
    <transition name="fade">
      <loader v-if="!user" />
      <div v-else class="card">
        <h1>Create User</h1>
        <user-detail v-model="user" />
        <h1 class="sub-header">User properties</h1>
        <user-properties v-model="user.properties" />
        <button @click="createUser">Create</button>
      </div>
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Notification } from "../../services/notif.service";
import UserDetail from "./UserDetail.vue";
import Loader from "../../components/Loader.vue";
import { UserService } from "../../services/user.service";
import { User } from "../../model/user.interface";
import UserProperties from "./UserProperties.vue";
import { EventService } from "../../services/event.service";
import { AppEvent } from "../../model/event.enum";

@Component({ components: { UserDetail, UserProperties, Loader } })
export default class UserCreateContainer extends Vue {
  public user: User = new User();
  private userService = UserService.getInstance();

  public async createUser() {
    try {
      const newUser = await this.userService.createUser(
        this.user.name,
        this.user.password,
        this.user.admin
      );
      EventService.dispatch(AppEvent.USER_CHANGED);
      this.$router.push("/users/" + newUser.id);
      Notification.show("User created");
    } catch (e) {
      Notification.show("User could not be created!", undefined, "failure");
    }
  }
}
</script>
