<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>
    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>
    <loader v-if="loading" />
    <p class="center" v-else-if="!records.length">категорий пока нет. <router-link to="/categories">добавить категорию</router-link></p>
    <section v-else>
      <historyTable :records="items" />
      <paginate
        v-model="page"
        :page-count="pageCountt"
        :click-handler="pageChangeHandler"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>
<script>
import historyTable from '@/components/historyTable'
import mixPag from '@/mixins/mixin.pagination'
import { Pie } from 'vue-chartjs'

export default {
  name: 'history',
  extends: Pie,
  mixins: [mixPag],
  data () {
    return {
      loading: true,
      categories: [],
      records: []
    }
  },
  async mounted () {
    const records = await this.$store.dispatch('fetchRecord')
    this.categories = await this.$store.dispatch('fetchCategories')
    const tooltip = 'посмотреть запись'
    this.records = records.map(record => {
      return {
        ...record,
        categoryName: this.categories.find(c => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход',
        tooltip
      }
    })
    this.setupPagination(this.records)
    this.renderChart({
      labels: this.categories.map(c => c.title),
      datasets: [{
        label: 'Расходы по категориям',
        data: this.categories.map(c => {
          return this.records.reduce((total, r) => {
            if (r.categoryId === c.id && r.type === 'outcome') {
              total += +r.amount
            }
            console.log('total', total)
            return total
          }, 0)
        }),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    })
    this.loading = false
  },
  components: { historyTable }
}
</script>
