<template>
  <section>
    <transition name="fade">
      <loader v-if="!realm" />
      <div v-else class="card">
        <h1>Realm details</h1>
        <realm-detail showId v-model="realm" />
        <h1>Realm properties</h1>
        <realm-properties v-model="realm.properties" />
        <button v-if="isDirty" @click="saveChanges">Save</button>
      </div>
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Notification } from "../../services/notif.service";
import RealmDetail from "./RealmDetail.vue";
import Loader from "../../components/Loader.vue";
import { RealmService } from "../../services/realm.service";
import { Realm } from "../../model/realm.interface";
import RealmProperties from "./RealmProperties.vue";

@Component({ components: { RealmDetail, RealmProperties, Loader } })
export default class RealmEditContainer extends Vue {
  private realmService = RealmService.getInstance();
  public realm: Realm | null = null;
  public fetchedRealm = "";
  public mounted() {
    if (this.$route.params.id) {
      this.loadRealm(this.$route.params.id);
    }
  }

  public async saveChanges() {
    try {
      const realm = this.realm || ({} as any);
      await this.realmService.updateRealm({
        id: realm.id,
        name: realm.name,
        domains: realm.domains,
        secret: realm.secret,
        customStyles: realm.customStyles
      });
      Notification.show("Realm updated");
    } catch (e) {
      Notification.show("Realm could not be updated!");
    }
  }

  private async loadRealm(id: string) {
    this.realm = await this.realmService.getRealm(id);
    this.fetchedRealm = JSON.stringify(this.realm);
  }

  get isDirty() {
    return this.fetchedRealm !== JSON.stringify(this.realm);
  }
}
</script>
