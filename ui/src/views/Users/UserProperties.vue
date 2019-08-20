<template>
  <div>
    <select v-model="selectedRealm">
      <option :value="realm.id" v-for="realm in realms" :key="realm.id">{{realm.name}}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Notification } from "../../services/notif.service";
import { PropService } from "../../services/prop.service";
import { RealmService } from "../../services/realm.service";
import { Realm } from "../../model/realm.interface";

@Component
export default class UserProperties extends Vue {
  private realms: Realm[] = [];
  private mySelectedRealm: string = "";
  private propService: PropService = PropService.getInstance();
  private realmService: RealmService = RealmService.getInstance();

  public async mounted() {
    this.realms = await this.realmService.getRealms();
  }

  get selectedRealm() {
    return this.mySelectedRealm;
  }
  set selectedRealm(value: string) {
    this.mySelectedRealm = value;
  }

  private async loadProperties(realmId: string, userId: string) {
    // await this.propService.get(realmId, userId);
  }
}
</script>
