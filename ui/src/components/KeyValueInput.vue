<template>
  <div>
    <label>{{label}}</label>
    <input v-bind:readonly="readonly" v-model="val" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class KeyValueInput extends Vue {
  @Prop() label!: string;
  @Prop() value!: string;
  @Prop() readonly!: boolean;

  get val() {
    return this.value;
  }
  set val(val: any) {
    this.$emit('input', val);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  display: flex;
}
label {
  width: 200px;
}
input {
  flex: 1 1 auto;
}
</style>
