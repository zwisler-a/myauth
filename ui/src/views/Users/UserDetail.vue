<template>
  <section>
    <loader v-if="!user"></loader>
    <div v-else class="card">
      <h1>User details</h1>
      <key-value-input label="Name" v-model="user.name"></key-value-input>
      <key-value-input label="Id" readonly v-model="user.id"></key-value-input>
      <key-value-input type="password" label="Password" v-model="user.password"></key-value-input>
      <key-value-input type="checkbox" label="Admin" readonly v-model="user.admin"></key-value-input>

      <button v-if="isDirty" @click="saveChanges">Save</button>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Notification } from '../../services/notif.service';
import KeyValueInput from '../../components/KeyValueInput.vue';
import { UserService } from '../../services/user.service';
import Loader from '../../components/Loader.vue';

@Component({ components: { KeyValueInput, Loader } })
export default class UserDetail extends Vue {
  public user = null;
  private userCopy: any;
  private userService: UserService;
  constructor() {
    super();
    this.userService = UserService.getInstance();
  }

  public mounted() {
    if (this.$route.params.id) {
      this.loadUser(this.$route.params.id);
    }
  }

  public async saveChanges() {
    try {
      const user = this.user || {} as any;
      await this.userService.updateUser(user.id, user.name, user.password, user.admin);
      Notification.show('User updated');
    } catch (e) {
      Notification.show('User could not be updated!');
    }
  }

  private async loadUser(id: string) {
    this.user = await this.userService.getUser(id);
    this.userCopy = Object.assign({}, this.user);
  }

  get isDirty() {
    return JSON.stringify(this.user) !== JSON.stringify(this.userCopy);
  }


}
</script>
