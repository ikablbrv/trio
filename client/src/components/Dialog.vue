<template lang="pug">
    v-card
      v-card-title {{title}}
        v-card-text
          v-row(v-if="title === 'Добавить сотрудника'")
            v-col(
              cols="12"
              sm="6"
              md="4")
              v-select(
                :items="selects"
                v-model="select"
                label="Должность"
                outlined
                dense)
          v-row
            v-col(
              v-for="(item,index) in headers"
              :key="item.text"
              cols="12"
              sm="6"
              md="4")
              v-text-field(
                v-model="item.field"
                :label="item.text"
                :type="item.type"
                outlined
                hide-spin-buttons)
          v-card-actions
            v-spacer
            v-btn(
              v-if="status === false"
              color="rgba(39, 181, 214, 1)"
              text
              @click="addFunc(headers, select)"
            ) Добавить
            v-btn(
              v-if="status === true"
              color="rgba(39, 181, 214, 1)"
              text
              @click="editFunc(headers, select)"
            ) Редактировать
            v-btn(
              color="rgba(39, 181, 214, 1)"
              text
              @click="cancel()"
            ) Отмена
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'custom-dialog',
  props: {
    selects: Array,
    addFunc: Function,
    editFunc: Function,
  },
  data() {
    return {
      select: null,
    };
  },
  watch: {
    headers() {
      return this.$store.getters.getHeaders;
    },
  },
  methods: {
    ...mapActions('dialog', [
      'setVisible',
      'setStatus',
      'setDataDialog',
    ]),
    cancel() {
      this.setVisible(false);
      this.setStatus(false);
      this.setStatus(true);
    },
  },
  computed: {
    ...mapGetters('dialog', {
      title: 'getTitle',
      status: 'getStatus',
      headers: 'getHeaders',
    }),
  },
  mounted() {
    if (this.selects) {
      // eslint-disable-next-line
      this.select = this.selects[0];
    }
  },
};

</script>
