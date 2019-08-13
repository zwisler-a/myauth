<template>
  <section>
    <div class="card">
      <h1>Create realm</h1>
      <key-value-input label="Name" v-model="realm.name"></key-value-input>
      <key-value-input label="Domains" v-model="realm.domains"></key-value-input>
      <key-value-input label="Secret" v-model="realm.secret"></key-value-input>
      <key-value-input label="Custom Styles" v-model="realm.customStyles"></key-value-input>

      <button @click="create">Create</button>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RealmService } from '../../services/realm.service';
import { Notification } from '../../services/notif.service';
import KeyValueInput from '../../components/KeyValueInput.vue';

@Component({ components: { KeyValueInput } })
export default class RealmCreate extends Vue {
  public realm = {};
  private realmService: RealmService;
  constructor() {
    super();
    this.realmService = RealmService.getInstance();
  }

  public async create() {
    try {
      const realm = this.realm as any;
      await this.realmService.createRealm({
        name: realm.name,
        domains: realm.domains,
        secret: realm.secret,
        customStyles: realm.customStyles
      });
      Notification.show('Realm created');
    } catch (e) {
      Notification.show('Realm could not be created!', undefined, 'failure');
    }
  }
}
</script>
