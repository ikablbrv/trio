<template lang="pug">
  v-row.table(align="start" justify="center")
    v-card.supply()
      v-row.supply__row(align="center" justify="space-around")
        v-text-field.supply__field_right(
          label="Продажи"
          disabled
          dense
          hide-details
          outlined)
        v-btn(
          @click="add()"
          fab
          outlined
          x-small
          color="rgba(39, 181, 214, 1)")
          v-icon mdi-plus
      v-text-field.supply__row(
        v-for="(item,index) in rows"
        :key="item.id"
        dense
        outlined
        hide-details)
</template>

<script>
import Table from '@/components/Table.vue';

export default {
  name: 'supply-page',
  data() {
    return {
      title: 'Добавить поставку',

      id: 0,
      rows: [],
    };
  },
  components: {
    Table,
  },
  computed: {
    items() {
      return this.$store.getters.getuser;
    },
  },
  methods: {
    add() {
      this.rows.push({ id: this.id });
      this.id += 1;
    },
  },
  created() {
    this.getInfo();
  },
};
</script>

<style lang="stylus">
  .supply{
    height: 100%
    width 100%
    padding: 24px
    &__row {
      margin-right 12px !important;
      margin-left 12px !important;
      margin-bottom 24px !important;
    }
    &__field{
      &_right{
        margin-right 12px !important
      }
      &_left{
        margin-left 12px !important
      }
    }
  }
</style>
