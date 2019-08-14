<template>
  <section>
    <transition name="fade">
      <loader v-if="!user" />
      <div v-else class="card">
        <h1>User details</h1>
        <user-detail showId v-model="user" />
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
import { User } from "../../model/user.interface";
import UserProperties from "./UserProperties.vue";
import { UserService } from "../../services/user.service";

@Component({ components: { UserDetail, UserProperties, Loader } })
export default class UserEditContainer extends Vue {
  public user!: User;
  private userService = UserService.getInstance();
  private fetchedUser!: string;
  public mounted() {
    if (this.$route.params.id) {
      this.loadUser(this.$route.params.id);
    }
  }

  public async saveChanges() {
    try {
      const user = this.user || ({} as any);
      await this.userService.updateUser(
        user.id,
        user.name,
        user.password,
        user.admin
      );
      Notification.show("User updated");
    } catch (e) {
      Notification.show("User could not be updated!");
    }
  }

  private async loadUser(id: string) {
    this.user = await this.userService.getUser(id);
    this.fetchedUser = JSON.stringify(this.user);
  }

  get isDirty() {
    return JSON.stringify(this.user) !== this.fetchedUser;
  }
}
</script>
