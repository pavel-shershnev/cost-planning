import _ from 'lodash'

export default {
  data () {
    return {
      page: +this.$route.query.page || 1,
      pageSize: 3,
      pageCountt: 0,
      allItems: [],
      items: []
    }
  },
  methods: {
    setupPagination (allRecords) {
      this.allItems = _.chunk(allRecords, this.pageSize)
      this.pageCountt = _.size(this.allItems)
      this.items = this.allItems[this.page - 1] || this.allItems[0]
    },
    pageChangeHandler (pAgE) {
      this.$router.push(`${this.$route.path}?page=${pAgE}`)
      this.items = this.allItems[pAgE - 1] || this.allItems[0]
    }
  }
}
