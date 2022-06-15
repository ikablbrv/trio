<template lang="pug">
  v-row.table(align="start" justify="center")
    v-card.supply()
      v-row.supply__row(align="center" justify="space-between")
        v-autocomplete.supply__field_right(
          v-model="provider"
          label="Поставщик"
          :items="providers"
          :item-text='selectItem'
          dense
          hide-details
          outlined)
        v-text-field.supply__field_left.supply__field_right(
          v-model="date"
          label="Дата"
          readonly
          dense
          hide-details
          outlined)
        v-text-field.supply__field_left(
          v-model='user'
          value=""
          label="Сотрудник"
          readonly
          dense
          hide-details
          outlined)
      v-expansion-panels(
          v-for="(item,index) in createdRows"
          :key="item.id"
          align="center"
          justify="space-around")
        v-expansion-panel
          v-expansion-panel-header()
            v-row(align="center" justify="center") Дата поставки - {{item.time}}
          v-expansion-panel-content.panel()
            v-row.panel__field(align="center" justify="center")
              v-text-field.panel__field(
                v-model="item.name"
                label="Наименование"
                dense
                outlined
                hide-details)
              v-autocomplete.panel__field(
                v-model="item.category"
                label="Категория"
                :items="categorys"
                :item-text='selectItem'
                dense
                outlined
                hide-details)
              v-text-field.panel__field(
                v-model="item.count"
                type="number"
                label="Количество"
                dense
                outlined
                hide-details)
              v-text-field.panel__field(
                v-model="item.price"
                type="number"
                label="Цена"
                dense
                outlined
                hide-details)
            v-row.panel__field(align="center" justify="center")
              v-btn.panel__btn(
                @click="editFunc(item)"
                outlined
                color="rgba(39, 181, 214, 1)") Редактировать
              v-btn.panel__btn(
                @click="deleteFunc(item)"
                outlined
                color="red") Удалить
      v-expansion-panels(
          v-for="(item,index) in rows"
          :key="item.id"
          align="center"
          justify="space-around")
        v-expansion-panel
          v-expansion-panel-header()
            v-row.date(align="center" justify="center") Поставка - {{hours}}:{{minutes}}:{{seconds}}
          v-expansion-panel-content.panel()
            v-row.panel__field(align="center" justify="center")
              v-text-field.panel__field(
                v-model="item.name"
                label="Наименование"
                dense
                outlined
                hide-details)
              v-autocomplete.panel__field(
                v-model="item.category"
                label="Категория"
                :items="categorys"
                :item-text='selectItem'
                dense
                outlined
                hide-details)
              v-text-field.panel__field(
                v-model="item.count"
                type="number"
                label="Количество"
                dense
                outlined
                hide-details)
              v-text-field.panel__field(
                v-model="item.price"
                type="number"
                label="Цена"
                dense
                outlined
                hide-details)
            v-row.panel__field(align="center" justify="center")
              v-btn.panel__btn(
                @click="createFunc(item)"
                outlined
                color="rgba(39, 181, 214, 1)") Создать
      v-row.add__row(align="center" justify="end")
          v-btn.add__row__btn(
            @click="add()"
            fab
            outlined
            color="rgba(39, 181, 214, 1)")
            v-icon mdi-plus
</template>

<script>
import axios from 'axios';
import Table from '@/components/Table.vue';

export default {
  name: 'supply-page',
  data() {
    return {
      title: 'Добавить поставку',
      id: 0,
      name: null,
      category: null,
      price: null,
      count: null,
      time: null,
      provider: null,
      user: null,
      providers: [],
      categorys: [],
      createdRows: [],
      rows: [],

      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  },
  components: {
    Table,
  },
  computed: {
    date() {
      let day = new Date().getDate();
      if (day < 10) {
        day = `0${day}`;
      }
      let month = new Date().getMonth() + 1;
      if ((month) < 10) {
        month = `0${month}`;
      }
      const year = new Date().getFullYear();
      const now = `${day}.${month}.${year}`;
      return now;
    },
  },
  methods: {
    setTime() {
      setInterval(() => {
        const date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        hours = hours <= 9 ? `${hours}`.padStart(2, 0) : hours;
        minutes = minutes <= 9 ? `${minutes}`.padStart(2, 0) : minutes;
        seconds = seconds <= 9 ? `${seconds}`.padStart(2, 0) : seconds;
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
      }, 1000);
    },
    selectItem(item) {
      return item.name;
    },
    getInfo() {
      let url = `${this.$baseUrl}api/provider/get`;
      axios
        .get(url)
        .then((res) => {
          this.providers = res.data.rows;
        })
        .catch((res) => console.log(res));

      url = `${this.$baseUrl}api/product/getCategory`;
      axios
        .get(url)
        .then((res) => {
          this.categorys = res.data;
        })
        .catch((res) => console.log(res));
      url = `${this.$baseUrl}api/supply/get`;
      axios
        .get(url)
        .then((res) => {
          this.createdRows = res.data;
          this.createdRows.forEach((el, index) => {
            let minutes = new Date(el.date).getMinutes();
            let hours = new Date(el.date).getHours();
            let day = new Date(el.date).getDate();
            let month = new Date(el.date).getMonth();
            const year = new Date(el.date).getFullYear();
            minutes = minutes <= 9 ? `${minutes}`.padStart(2, 0) : minutes;
            hours = hours <= 9 ? `${hours}`.padStart(2, 0) : hours;
            day = day <= 9 ? `${day}`.padStart(2, 0) : day;
            month = (month + 1) <= 9 ? `${month + 1}`.padStart(2, 0) : (month + 1);

            const time = `${day}.${month}.${year}  ${hours}:${minutes}`;
            this.createdRows[index].time = time;
          });
        })
        .catch((res) => console.log(res));
    },
    add() {
      this.rows.push({ id: this.id });
      this.id += 1;
    },
    createFunc(item) {
      const url = `${this.$baseUrl}api/supply/create`;
      let body = {};
      body = item;
      body.date = new Date();
      body.provider = this.provider;
      body.user = this.user;
      body.total = body.price * body.count;
      axios
        .post(url, body)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
    editFunc() {},
    deleteFunc(item) {
      const url = `${this.$baseUrl}api/supply/delete`;
      const body = {
        id: item.id,
      };
      axios
        .post(url, body)
        .then((res) => {
          if (res.status === 200) {
            const index = this.createdRows.indexOf(item);
            this.createdRows.splice(index, 1);
          }
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.setTime();
  },
  created() {
    this.getInfo();
  },
};
</script>

<style lang="stylus">
  .add__row {
    width 100%
    position absolute
    bottom: 0px
    right 0px
    &__btn {
      margin 12px
    }
  }
  .v-expansion-panels {
    margin-bottom: 16px
  }
  .v-expansion-panel-content__wrap {
    flex-direction: row !important;
  }
  .panel{
    &__row {
      width 100%
      padding 16px 24px
    }
    &__btn {
      margin-right 24px
    }
    &__field{
      padding 16px !important;
      &_right{
      }
      &_left{
      }
      &_number {
        max-width: 15%;
      }
      &_name {
      }
    }
  }
  .supply{
    height: 100%
    width 100%
    padding-top: 24px !important;
    padding-right: 24px !important;
    padding-left: 24px !important;
    padding-bottom: 80px !important;
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
      &_number {
        margin-left: 12px !important
        max-width: 15%;
      }
      &_name {
        margin-right: 12px !important
      }
    }
  }
</style>
