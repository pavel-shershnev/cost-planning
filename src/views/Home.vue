<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>
      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>
<loader v-if="loading" />
    <div class="row" v-else>
      <home-bill
      :rates="currency.rates" />

      <home-corrency
      :rates="currency.rates"
      :date="currency.date"/>
    </div>
  </div>
</template>
<script>

import homeBill from '@/components/homeBill'
import homeCorrency from '@/components/homeCorrency'
export default {
  data () {
    return {
      loading: true,
      currency: null
    }
  },
  methods: {
    async refresh () {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    }
  },
  async mounted () {
    try {
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    } catch (error) {}
  },
  components: {
    homeBill, homeCorrency
  }
}
</script>
