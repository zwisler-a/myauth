<template>
  <section>
    <transition name="fade">
      <loader v-if="!realm"></loader>
      <div v-else>
        <key-value-input label="Name" v-model="realm.name"></key-value-input>
        <key-value-input label="Id" readonly v-model="realm.id"></key-value-input>
        <key-value-input label="Domains" v-model="realm.domains"></key-value-input>
        <key-value-input label="Secret" v-model="realm.secret"></key-value-input>
        <key-value-input label="Custom Styles" v-model="realm.customStyles"></key-value-input>

        <button v-if="isDirty" @click="saveChanges">Save</button>
      </div>
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RealmService } from '../../services/realm.service';
import { Notification } from '../../services/notif.service';
import KeyValueInput from '../../components/KeyValueInput.vue';
import Loader from '../../components/Loader.vue';

@Component({ components: { KeyValueInput, Loader } })
export default class RealmDetail extends Vue {
  public realm = null;
  private realmCopy: any;
  private realmService: RealmService;
  constructor() {
    super();
    this.realmService = RealmService.getInstance();
  }

  public mounted() {
    if (this.$route.params.id) {
      this.loadRealm(this.$route.params.id);
    }
  }

  public async saveChanges() {
    try {
      const realm = this.realm || {} as any;
      await this.realmService.updateRealm({
        id: realm.id,
        name: realm.name,
        domains: realm.domains,
        secret: realm.secret,
        customStyles: realm.customStyles
      });
      Notification.show('Realm updated');
    } catch (e) {
      Notification.show('Realm could not be updated!');
    }
  }

  private async loadRealm(id: string) {
    this.realm = await this.realmService.getRealm(id);
    this.realmCopy = Object.assign({}, this.realm);
  }

  get isDirty() {
    return JSON.stringify(this.realm) !== JSON.stringify(this.realmCopy);
  }


}
</script>
<style scoped>
section {
  flex: 1 1 auto;
}
</style>
