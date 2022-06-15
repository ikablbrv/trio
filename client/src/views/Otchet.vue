<template lang="pug">
  v-row.otcher(align="start" justify="center")
    v-card.otchet__container()
      v-autocomplete.otchet__container__field(
        v-model="otchetType"
        label="Вид отчета"
        :items="types"
        dense
        hide-details
        outlined)
      v-text-field.otchet__container__field(
        v-model="dateStart"
        type="date"
        label="Дата начала"
        dense
        hide-details
        outlined)
      v-text-field.otchet__container__field(
        v-model="dateEnd"
        type="date"
        label="Дата конца"
        dense
        hide-details
        outlined)
      v-btn.otchet__container__btn(
        @click="create()"
        outlined
        color="rgba(39, 181, 214, 1)") Создать отчёт

    Table(
      :headers="headers"
      :rows="rows"
      :items="data"
    )
</template>

<script>
import Table from '@/components/Table.vue';
import axios from 'axios';

export default {
  name: 'otchet-page',
  data() {
    return {
      providers: [],
      otchetType: null,
      dateStart: null,
      dateEnd: null,
      rows: 15,
      types: [
        { text: 'Поставки' },
        { text: 'Продажи' },
        { text: 'Возвраты' },
      ],

      headers: [
        {
          text: 'Поставщик',
          align: 'start',
          sortable: false,
          value: 'provaider',
        },
        { text: 'Товар', value: 'name' },
        { text: 'Поступило', value: 'count' },
      ],

      data: [],
    };
  },
  components: {
    Table,
  },
  methods: {
    create() {
      let url = null;
      console.log(this.otchetType);
      switch (this.otchetType) {
        case 'Поставки': url = `${this.$baseUrl}api/supply/getOtchet`;
          break;
        default: url = null;
      }
      const body = {
        dateStart: new Date(this.dateStart),
        dateEnd: new Date(this.dateEnd),
      };
      axios
        .post(url, body)
        .then((res) => {
          res.data.forEach((el) => {
            console.log(el);
            const index = this.data.findIndex((item) => item.name === el.name);
            console.log(index);
            if (index === -1) {
              this.data.push(el);
            } else {
              this.data[index].count += el.count;
            }
          });
          this.handler(this.data);
        })
        .catch((res) => console.log(res));
    },
    handler(data) {
      data.forEach((el, index) => {
        const i = this.providers.findIndex((item) => item.id === el.providerId);
        if (i !== -1) {
          this.data[index].provaider = this.providers[i].name;
        }
        console.log(el);
      });
    },
    getInfo() {
      const url = `${this.$baseUrl}api/provider/get`;

      axios
        .get(url)
        .then((res) => {
          this.providers = res.data.rows;
          console.log(this.providers);
        })
        .catch((res) => console.log(res));
    },
  },
  created() {
    this.getInfo();
  },
};
</script>

<style lang="stylus" scoped>
  .otchet{
    height 100% !important
    &__container {
      width 100%
      height 100% !important
      display: flex
      grid-template-columns: repeat(4, 1fr)
      margin 24px
      &__field{
        padding 12px !important
      }
      &__btn{
        width 300px
        height 40px !important
        padding 12px !important
        margin 12px !important
      }
    }
  }
</style>
