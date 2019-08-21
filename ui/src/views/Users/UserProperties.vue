<template>
  <div>
    <select v-model="selectedRealm">
      <option :value="realm.id" v-for="realm in realms" :key="realm.id">{{realm.name}}</option>
    </select>
    <key-value-input
      v-for="prop in properties"
      :key="prop.id"
      v-model="prop.value.value"
      :label="prop.name"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Notification } from "../../services/notif.service";
import { PropService } from "../../services/prop.service";
import { RealmService } from "../../services/realm.service";
import { Realm } from "../../model/realm.interface";
import KeyValueInput from "../../components/KeyValueInput.vue";

@Component({ components: { KeyValueInput } })
export default class UserProperties extends Vue {
  @Prop() public userId!: string;
  public properties: any[] = [];
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
    this.loadProperties(value, this.userId);
  }

  private async loadProperties(realmId: string, userId: string) {
    const [definitions, values] = await Promise.all([
      this.propService.getDefinition(realmId),
      this.propService.get(userId, realmId)
    ]);
    this.properties = definitions.map(definition =>
      Object.assign(definition, {
        value: values.find(value => value.definitionId === definition.id) || {
          value: ""
        }
      })
    );
  }
}
</script>
