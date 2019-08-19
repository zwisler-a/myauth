<template>
  <form>
    <key-value-input label="Name" v-model="name"></key-value-input>
    <key-value-input v-if="showId" label="Id" readonly v-model="id"></key-value-input>
    <key-value-input label="Domains" v-model="domains"></key-value-input>
    <key-value-input label="Secret" v-model="secret"></key-value-input>
    <key-value-input label="Custom Styles" v-model="customStyles"></key-value-input>
  </form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { RealmService } from "../../services/realm.service";
import { Notification } from "../../services/notif.service";
import KeyValueInput from "../../components/KeyValueInput.vue";
import { Realm } from "../../model/realm.interface";

@Component({ components: { KeyValueInput } })
export default class RealmDetail extends Vue {
  @Prop({ default: {} }) public value!: Realm;
  @Prop({ default: false }) public showId!: boolean;
  constructor() {
    super();
  }
  get name() {
    return this.value.name;
  }
  set name(val: string) {
    this.value.name = val;
    this.$emit("input", this.value);
  }
  get id() {
    return this.value.id;
  }
  set id(val: string) {
    this.value.id = val;
    this.$emit("input", this.value);
  }
  get domains() {
    return this.value.domains;
  }
  set domains(val: string) {
    this.value.domains = val;
    this.$emit("input", this.value);
  }
  get secret() {
    return this.value.secret;
  }
  set secret(val: string) {
    this.value.secret = val;
    this.$emit("input", this.value);
  }
  get customStyles() {
    return this.value.customStyles;
  }
  set customStyles(val: string) {
    this.value.customStyles = val;
    this.$emit("input", this.value);
  }
}
</script>
