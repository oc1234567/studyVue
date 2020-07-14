<template>
  <div id="container">
    <h1>{{ initData }}</h1>
    <span v-if="seen">Now you see me</span>
    <span>{{ message }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      initData: "Vue 开发环境运行成功",
      message: "Hello Vue!",
      seen: true
    };
  }
};
</script>

<style scoped>
#container {
  color: red;
  display: flex;
}
</style>