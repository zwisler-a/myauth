<template>
  <section>
    <div v-if="!realm">Loading...</div>
    <div v-else>
      <key-value-input label="Name" v-model="realm.name"></key-value-input>
      <key-value-input label="Id" readonly v-model="realm.id"></key-value-input>
      <key-value-input label="Domains" v-model="realm.domains"></key-value-input>
      <key-value-input label="Secret" v-model="realm.secret"></key-value-input>
      <key-value-input label="Custom Styles" v-model="realm.customStyles"></key-value-input>

      <button v-if="isDirty" @click="saveChanges">Save</button>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SubList from '../components/SubList.vue';
import { RealmService } from '../../services/realm.service';
import KeyValueInput from '../../components/KeyValueInput.vue';

@Component({ components: { KeyValueInput } })
export default class RealmDetail extends Vue {
  private realmService: RealmService;
  realm = null;
  realmCopy: any;
  constructor() {
    super();
    this.realmService = RealmService.getInstance();
  }

  mounted() {
    if (this.$route.params.id) {
      this.loadRealm(this.$route.params.id);
    }
  }

  private async loadRealm(id: string) {
    this.realm = await this.realmService.getRealm(id);
    this.realmCopy = Object.assign({}, this.realm);
  }

  async saveChanges() {
    if (this.realm) {
      await this.realmService.updateRealm({
        id: this.realm.id,
        name: this.realm.name,
        domains: this.realm.domains,
        secret: this.realm.secret,
        customStyles: this.realm.customStyles
      })
      this.$router.push(this.$router.currentRoute);
    }
  }

  get isDirty() {
    return JSON.stringify(this.realm) !== JSON.stringify(this.realmCopy);
  }


}
</script>
