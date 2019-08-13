<template>
  <section>
    <div class="card">
      <h1>Create user</h1>
      <key-value-input label="Name" v-model="user.name"></key-value-input>
      <key-value-input type="password" label="Password" v-model="user.password"></key-value-input>
      <key-value-input type="checkbox" label="Admin" readonly v-model="user.admin"></key-value-input>

      <button @click="create">Create</button>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserService } from '../../services/user.service';
import { Notification } from '../../services/notif.service';
import KeyValueInput from '../../components/KeyValueInput.vue';

@Component({ components: { KeyValueInput } })
export default class UserCreate extends Vue {
  public user = {};
  private userService: UserService;
  constructor() {
    super();
    this.userService = UserService.getInstance();
  }

  public async create() {
    try {
      const user = this.user as any;
      await this.userService.createUser(user.name, user.password, user.admin);
      Notification.show('Realm created');
    } catch (e) {
      Notification.show('Realm could not be created!', undefined, 'failure');
    }
  }
}
</script>
