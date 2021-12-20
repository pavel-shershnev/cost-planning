<template>
<div>
  <div class="grey darken-1 empty-layout">
    <router-view></router-view>
  </div>
</div>
</template>
<script>
import messages from '@/utils/messages'
export default {
  computed: {
    errorComp () {
      return this.$store.getters.error
    }
  },
  watch: {
    errorComp (fbError) {
      console.log(fbError.code)
      this.$error(messages[fbError.code] || 'что-то пошло не так')
    }
  }
}
</script>
