<template>
  <form>
    <key-value-input label="Name" v-model="user.name"></key-value-input>
    <key-value-input label="Id" readonly v-model="user.id"></key-value-input>
    <key-value-input type="password" label="Password" v-model="user.password"></key-value-input>
    <key-value-input type="checkbox" label="Admin" readonly v-model="user.admin"></key-value-input>
  </form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import KeyValueInput from "../../components/KeyValueInput.vue";
import { User } from "../../model/user.interface";

@Component({ components: { KeyValueInput } })
export default class UserDetail extends Vue {
  @Prop({ default: {} }) public user!: User;
}
</script>
