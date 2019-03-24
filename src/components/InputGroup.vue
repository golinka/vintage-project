<template>
  <div
    class="input-group"
    :class="{ 'invalid': validationError(name) }">
    <div class="input-group__wrapper">
      <label :for="name">{{ capitalizeName }}</label>
      <input
        v-model="inputValue"
        v-validate="rules"
        :id="name"
        :name="name"
        @input="changeValue"
        type="text">
    </div>
    <small
      v-if="validationError(name)"
      class="error-text mb-2">{{ validationError(name) }}</small>
  </div>
</template>

<script>
export default {
  inject: ['$validator'],
  props: {
    rules: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      required: true,
    },
  },
  data() {
    return {
      inputValue: this.value,
    };
  },
  computed: {
    capitalizeName() {
      if (!this.name) return '';
      const result = this.name.toString();
      return result.charAt(0).toUpperCase() + result.slice(1);
    },
    validationError() {
      return field => this.$validator.errors.first(field);
    },
  },
  methods: {
    changeValue() {
      this.$emit('valueChanged', {
        name: this.name,
        value: this.inputValue,
      });
    },
  },
};
</script>
