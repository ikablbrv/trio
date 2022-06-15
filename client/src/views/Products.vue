<template lang="pug">
  Table(
    :items="products"
    :headers="headers"
    :rows="rows"

    :addFunc="addFunc"
    :editFunc="editFunc"
    :deleteFunc="deleteFunc"
  )
</template>

<script>
import Table from '@/components/Table.vue';
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'products-page',
  data() {
    return {
      products: [],
      category: null,
      count: null,
      rows: 15,
      headers: [
        {
          text: 'Наименование',
          value: 'name',
          field: '',
          align: 'start',
          sortable: false,
        },
        { text: 'Категория', value: 'category' },
        { text: 'Количество', value: 'count' },
        { text: 'Цена за 1ед', value: 'price' },
        { text: 'Общая стоимость', value: 'total' },
        {
          text: 'Редактировать',
          value: 'edit',
          sortable: false,
          align: 'center',
        },
        {
          text: 'Удалить',
          value: 'delete',
          sortable: false,
          align: 'center',
        },
      ],
      dialogHeaders: [
        {
          text: 'Наименование',
          value: 'name',
          field: '',
          align: 'start',
          sortable: false,
        },
        {
          text: 'Категория',
          value: 'category',
          field: '',
        },
        {
          text: 'Количество',
          value: 'count',
          field: '',
          type: 'number',
        },
        {
          text: 'Цена за 1ед',
          value: 'price',
          field: '',
          type: 'number',
        },
      ],
    };
  },
  components: {
    Table,
  },
  computed: {
    ...mapGetters('dialog', {
      data: 'getData',
    }),
  },
  methods: {
    ...mapActions('dialog', [
      'setHeadersDialog',
      'setVisible',
    ]),
    addFunc(headers) {
      const url = `${this.$baseUrl}api/product/create`;
      const body = {};
      headers.forEach((el) => {
        let bubble = null;
        if (el.type !== 'number') {
          bubble = el.field[0].toUpperCase() + el.field.slice(1, el.field.length);
        } else {
          bubble = el.field;
        }
        const key = el.value;
        const value = bubble;
        body[key] = value;
      });

      axios
        .post(url, body)
        .then((res) => {
          if (res.status === 200) {
            this.setVisible(false);
            const item = res.data.products;
            item.category = res.data.category;
            this.products.push(item);
            this.$store.dispatch('setProducts', this.products);
          }
        })
        .catch((res) => console.log(res));
    },
    editFunc(headers) {
      const url = `${this.$baseUrl}api/product/update`;
      const body = {};
      headers.forEach((el) => {
        let bubble = null;
        if (el.type !== 'number') {
          bubble = el.field[0].toUpperCase() + el.field.slice(1, el.field.length);
        } else {
          bubble = el.field;
        }
        const key = el.value;
        const value = bubble;
        body[key] = value;
      });
      body.id = this.data.id;

      axios
        .post(url, body)
        .then((res) => {
          if (res.status === 200) {
            this.setVisible(false);
            const i = this.products.indexOf(this.data);
            this.products.splice(i, 1);
            const item = res.data.products;
            item.category = res.data.category;
            this.products.push(item);
            this.$store.dispatch('setProducts', this.products);
            this.handlerOne(res);
          }
        })
        .catch((res) => console.log(res));
    },
    deleteFunc(item) {
      const index = this.products.indexOf(item);

      const url = `${this.$baseUrl}api/product/delete`;
      const body = {
        id: item.id,
      };
      axios
        .post(url, body)
        .then((res) => {
          if (res.status === 200) {
            this.products.splice(index, 1);
          }
        })
        .catch((res) => console.log(res));
    },
    getInfo() {
      const url = `${this.$baseUrl}api/product/get`;
      axios
        .get(url)
        .then((res) => this.handler(res))
        .catch((res) => console.log(res));
    },
    handler(data) {
      this.category = data.data.category.rows;
      this.$store.dispatch('setCategory', this.category);

      this.count = data.data.products.count;
      this.$store.dispatch('setCount', this.count);

      this.products = data.data.products.rows;
      for (let i = 0; i < this.count; i += 1) {
        const name = this.category.find((item) => item.id === (this.products[i].categoryId));
        this.products[i].category = name.name;
      }
      this.$store.dispatch('setProducts', this.products);
    },
  },
  created() {
    this.getInfo();
    this.setHeadersDialog({ title: 'Добавить товар', headers: this.dialogHeaders });
  },
};
</script>
