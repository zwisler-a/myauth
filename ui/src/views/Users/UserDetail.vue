<template>
  <form>
    <key-value-input label="Name" v-model="name"></key-value-input>
    <key-value-input label="Id" v-if="showId" readonly v-model="id"></key-value-input>
    <key-value-input type="password" label="Password" v-model="password"></key-value-input>
    <key-value-input type="checkbox" label="Admin" readonly v-model="admin"></key-value-input>
  </form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import KeyValueInput from "../../components/KeyValueInput.vue";
import { User } from "../../model/user.interface";

@Component({ components: { KeyValueInput } })
export default class UserDetail extends Vue {
  @Prop({ default: () => ({}) }) public value!: User;
  @Prop({ default: false }) public showId!: boolean;

  get name() {
    return this.value.name;
  }
  set name(val: any) {
    this.value.name = val;
    this.$emit("input", this.value);
  }

  get id() {
    return this.value.id;
  }
  set id(val: any) {
    this.value.id = val;
    this.$emit("input", this.value);
  }

  get password() {
    return null;
  }
  set password(val: any) {
    this.value.password = val;
    this.$emit("input", this.value);
  }

  get admin() {
    return this.value.admin;
  }
  set admin(val: any) {
    this.value.admin = val;
    this.$emit("input", this.value);
  }
}
</script>
