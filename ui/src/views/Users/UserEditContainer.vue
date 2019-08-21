<template>
  <section>
    <transition name="fade">
      <loader v-if="!user" />
      <div v-else class="card">
        <h1>
          User details
          <span @click="deleteUser" class="delete-button">
            <trash-icon />
          </span>
        </h1>
        <user-detail showId v-model="user" />
        <h1 class="sub-header">User properties</h1>
        <user-properties :userId="user.id" v-model="user.properties" />
        <button v-if="isDirty" @click="saveChanges">Save</button>
      </div>
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Notification } from "../../services/notif.service";
import { EventService } from "../../services/event.service";
import UserDetail from "./UserDetail.vue";
import Loader from "../../components/Loader.vue";
import { User } from "../../model/user.interface";
import UserProperties from "./UserProperties.vue";
import { UserService } from "../../services/user.service";
import TrashIcon from "../../components/TrashIcon.vue";
import { AppEvent } from "../../model/event.enum";

@Component({ components: { UserDetail, UserProperties, Loader, TrashIcon } })
export default class UserEditContainer extends Vue {
  public user: User | null = null;
  private userService: UserService = UserService.getInstance();
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
      EventService.dispatch(AppEvent.USER_CHANGED);
      Notification.show("User updated");
    } catch (e) {
      Notification.show("User could not be updated!");
    }
  }

  public async deleteUser() {
    try {
      const user = this.user || ({} as any);
      await this.userService.deleteUser(user.id);
      EventService.dispatch(AppEvent.USER_CHANGED);
      this.$router.push("/users");
      Notification.show("User deleted!");
    } catch (e) {
      Notification.show("User could not be deleted!", undefined, "failure");
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

<style scoped>
.delete-button {
  cursor: pointer;
  margin-left: auto;
  float: right;
}
</style>
