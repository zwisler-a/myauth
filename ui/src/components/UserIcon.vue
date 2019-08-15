<template>
  <div class="wrapper">
    <div class="profile icon"></div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  width: 23px;
  height: 23px;
  display: inline-block;
}
.profile.icon {
  color: white;
  position: absolute;
  margin-left: 3px;
  margin-top: 11px;
  width: 14px;
  height: 6px;
  border-left: solid 1px currentColor;
  border-right: solid 1px currentColor;
  border-top: solid 1px currentColor;
  border-bottom: solid 1px transparent;
  border-radius: 6px 6px 0 0;
}

.profile.icon:before {
  content: "";
  position: absolute;
  left: 2px;
  top: -10px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: solid 1px currentColor;
}
</style>
