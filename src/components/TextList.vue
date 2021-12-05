<template>
  <p :class="$style.label">List</p>
  <ul v-for="text in list" :key="text.text" :class="listClasses">
    <li>
      <div :class="$style['text-card']">
        <div v-html="text.text" :class="$style['html']"></div>
        <p :class="$style.timestamp">
          Timestamp:
          <span :class="$style.time">{{ text.start }} - {{ text.end }}</span>
        </p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "TextList",
  props: {
    list: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    listClasses() {
      return [this.$style.list, this.$props.loading ? this.$style.loading : ""];
    },
  },
};
</script>

<style module>
.label {
  margin: 1rem 0;
}

.list {
  list-style-type: none;
}

.list.loading {
  opacity: 0.6;
  pointer-events: none;
}

.text-card {
  padding: 0.75rem;
  box-shadow: var(--shadow);
  border-radius: 3px;
  background-color: white;
  margin: 1rem 0;
}

.text-card .html {
  margin-bottom: 0.75rem;
}

.text-card .timestamp {
  color: #757575ed;
}

.text-card .time {
  font-weight: bold;
  color: black;
}
</style>