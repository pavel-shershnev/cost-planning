<template>
  <div>
    <div>
      <loader v-if="loading" />
      <p v-else-if="!record">записей нет</p>
      <div v-else>
        <div class="breadcrumb-wrap">
          <router-link to="/history" class="breadcrumb">История</router-link>
          <a class="breadcrumb" @click.prevent>
            {{recordText}}
          </a>
        </div>
        <div class="row">
          <div class="col s12 m6">
            <div
            class="card"
            :class="[recordType]"
            >
              <div class="card-content white-text">
                <p>Описание: {{ record.description }}</p>
                <p>Сумма: {{ record.amount }}</p>
                <p>Категория: {{ category.title }}</p>

                <small>{{ record.date }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      record: null,
      category: {},
      loading: true

    }
  },
  computed: {
    recordType () {
      return this.record.type === 'income' ? 'green' : 'red'
    },
    recordText () {
      return this.record.type === 'income' ? 'Доход' : 'Расход'
    }
  },
  async mounted () {
    const recordId = this.$route.params.id
    this.record = await this.$store.dispatch('fetchRecordById', recordId)
    const idCat = this.record.categoryId
    this.category = await this.$store.dispatch('fetchCategoryById', idCat)
    this.loading = false
  }
}
</script>
