<template>
  <div>
    <label>{{label}}</label>
    <input v-bind:readonly="readonly" v-bind:type="type" v-model="val" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class KeyValueInput extends Vue {
  @Prop() public label!: string;
  @Prop() public value!: string;
  @Prop() public readonly!: boolean;
  @Prop({ default: 'text' }) public type!: string;

  public get val() {
    return this.value;
  }
  public set val(val: any) {
    this.$emit('input', val);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  display: flex;
  align-items: center;
  min-height: 35px;
}
label {
  width: 200px;
}
input {
  flex: 1 1 auto;
}
</style>
