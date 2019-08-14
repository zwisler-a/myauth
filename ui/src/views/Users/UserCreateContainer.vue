<template>
  <section>
    <transition name="fade">
      <loader v-if="!user" />
      <div v-else class="card">
        <h1>Create User</h1>
        <user-detail v-model="user" />
        <h1>User properties</h1>
        <user-properties v-model="user.properties" />
        <button v-if="isDirty" @click="save">Save</button>
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

@Component({ components: { UserDetail, UserProperties, Loader } })
export default class UserCreateContainer extends Vue {
  public user!: object;
  private userService = UserService.getInstance();

  public async create() {
    try {
      const user = this.user as any;
      await this.userService.createUser({
        name: user.name,
        domains: user.domains,
        secret: user.secret,
        customStyles: user.customStyles
      });
      Notification.show("User created");
    } catch (e) {
      Notification.show("User could not be created!", undefined, "failure");
    }
  }
}
</script>
