<template>
  <form @submit.prevent="onSubmit">
    <h2 class="label-wrapper">
      <label for="new-todo-input" class="label__lg">What needs to be done?</label>
    </h2>
    <input id="new-todo-input" v-model.lazy.trim="label" type="text" name="new-todo" autocomplete="off" class="input__lg" />
    <button type="submit" class="btn btn__primary btn__lg">Add</button>
  </form>
</template>
    
<script>
export default {
  data() {
    return {
      label: ""
    };
  },
  methods: {
    onSubmit() {
      if (this.label === "") {
        return;
      }
      this.$emit("todo-added", this.label);
      this.label = "";
    }
  }
};
</script>