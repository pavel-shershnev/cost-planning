<template>
  <div>
    <loader v-if="loading" />
    <div v-else>
      <div class="app-main-layout">
        <navbar @click="isOpen= !isOpen"></navbar>
        <sidebar :value="isOpen"></sidebar>
        <main class="app-content" :class="{full: !isOpen}">
          <div class="app-page">
            <router-view></router-view>
          </div>
        </main>

        <div class="fixed-action-btn">
          <router-link class="btn-floating btn-large blue" to="/record">
            <i class="large material-icons">add</i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navbar from '@/components/app/navbar'
import sidebar from '@/components/app/sidebar'
export default {
  data () {
    return {
      isOpen: true,
      loading: true
    }
  },
  async mounted () {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.loading = false
  },
  components: { navbar, sidebar }
}
</script>
