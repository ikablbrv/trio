<template lang="pug">
  v-row.table(align="start" justify="center")
    v-card(class="elevation-4")
      v-card-title(v-if="$route.name !== 'otchet'")
        v-text-field(
          v-model="search"
          append-icon="mdi-magnify"
          label="Поиск"
          single-line
          hide-details
        )
        v-btn.table__btn_add(
          v-on:click="openDialog()"
          fab
          outlined
          x-small
          color="rgba(39, 181, 214, 1)"
        )
          v-icon mdi-plus
      v-data-table.table__data(
        :headers="headers"
        :items="items"
        :items-per-page="rows"
        :search="search"
      )
        <template v-slot:item.edit="{ item }">
            v-icon(
              color="black"
              @click="editItem(item)") mdi-pencil
        </template>
        <template v-slot:item.delete="{ item }">
            v-icon(
              color="black"
              @click="deleteFunc(item)") mdi-delete
        </template>
    v-dialog(
      v-model="visible"
      max-width="600"
    )
      custom-dialog(
        :selects="selects"
        :addFunc="addFunc"
        :editFunc="editFunc"
      )
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import customDialog from './Dialog.vue';

export default {
  name: 'CustomTable',
  props: {
    items: Array,
    headers: Array,
    rows: Number,
    status: String,
    selects: Array,

    addFunc: Function,
    editFunc: Function,
    deleteFunc: Function,
  },
  data() {
    return {
      search: '',
    };
  },
  components: {
    customDialog,
  },
  methods: {
    ...mapActions('dialog', [
      'setVisible',
      'setStatus',
      'setDataDialog',
    ]),
    openDialog() {
      this.setDataDialog({});
      this.setStatus(true);
      this.setStatus(false);
      this.setVisible(true);
    },
    editItem(data) {
      this.setDataDialog(data);
      this.setStatus(false);
      this.setStatus(true);
      this.setVisible(true);
    },
  },
  computed: {
    ...mapGetters('dialog', {
      dialogVisible: 'getVisible',
    }),
    visible: {
      get() {
        return this.dialogVisible;
      },
      set(val) {
        this.setVisible(val);
        this.setStatus(false);
        this.setStatus(true);
      },
    },
  },
};
</script>

<style lang="stylus">
  .table {
    height: 100%
    width 100%
    padding: 24px
    &__data {
      max-height: 100%
      width 100%
    }
    &__btn_add {
      margin-top: 16px;
      margin-left: 8px;
    }
  }
  th {
    border-bottom: thin solid transparent;
    border-image: linear-gradient(135deg, rgba(56, 190, 197, 1), rgba(39, 181, 214, 1));
    border-image-slice: 1;
  }
  tr:hover:not(tr:only-child) {
    background: linear-gradient(135deg, rgba(254, 182, 140, 1), rgba(232, 109, 144, 1)) !important
  }
  .v-card {
    width 100%
  }
  .row {
    margin: 0 !important
  }
</style>
