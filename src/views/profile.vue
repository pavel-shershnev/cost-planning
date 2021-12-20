<template>
  <div>
  <div class="page-title">
    <h3>{{ 'ProfileTitle' | localize }}</h3>
  </div>

  <form class="form" @submit.prevent="submitHandler">

  <div class="input-field">
        <input
            id="name"
            type="text"
            v-model.trim="name"
            :class = "{invalid: !$v.name.required }"
        >
        <label for="name" >Имя</label>
        <small
        class="helper-text invalid"
        v-if="!$v.name.required"
        >Введите имя</small>
    </div>
    <div class="switch">
      <label>
        English
        <input type="checkbox" v-model="isRuLocale">
        <span class="lever"></span>
        Русский
      </label>
    </div>
<br>
    <button class="btn waves-effect waves-light" type="submit">
      {{'UpdateTitle' | localize}}
      <i class="material-icons right">send</i>
    </button>
  </form>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'profile',
  metaInfo: {
    title: 'Profile'
  },
  computed: {
    ...mapGetters(['info'])
  },
  data () {
    return {
      name: '',
      isRuLocale: true
    }
  },
  validations: {
    name: { required }
  },
  mounted () {
    this.name = this.info.name
    this.isRuLocale = this.info.locale === 'ru-Ru'
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      // M.updateTextFields()
    }, 0)
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      await this.$store.dispatch('updateInfo', {
        name: this.name,
        locale: this.isRuLocale ? 'ru-Ru' : 'en-Us'
      })
      this.$message('Изменения сохранены')
    }
  }
}
</script>
