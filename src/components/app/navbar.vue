<template>
      <nav class="navbar orange lighten-1">
          <div class="nav-wrapper">
            <div class="navbar-left">
              <a href="#" @click.prevent="$emit('click')">
                <i class="material-icons black-text">dehaze</i>
              </a>
              <span class="black-text">{{date | dateF('dateTime')}}</span>
            </div>

                <ul class="right hide-on-small-and-down">
                  <li>
                    <a
                      class="dropdown-trigger black-text"
                      href="#"
                      data-target="dropdown"
                      ref="drop"
                    > {{name}}
                      <i class="material-icons right">arrow_drop_down</i>
                    </a>

                    <ul id='dropdown' class='dropdown-content'>
                      <li>
                        <router-link  to="/profile" class="black-text">
                          <i class="material-icons">account_circle</i>Профиль
                        </router-link>
                      </li>
                      <li class="divider" tabindex="-1"></li>
                      <li>
                        <a href="#" class="black-text" @click.prevent="logout">
                          <i class="material-icons">assignment_return</i>Выйти
                        </a>
                      </li>
                    </ul>
                 </li>
                </ul>
          </div>
        </nav>
</template>
<script>
export default {
  data: () => ({
    date: new Date(),
    interval: null,
    Dropdown: null
  }),
  methods: {
    async logout () {
      await this.$store.dispatch('logout')
      this.$router.push('/login?massage=logout')
    }
  },
  computed: {
    name () {
      return this.$store.getters.info.name
    }
  },
  mounted () {
    setInterval(() => {
      this.interval = this.date = new Date()
    }, 1000)
    // eslint-disable-next-line no-undef
    this.dropdown = M.Dropdown.init(this.$refs.drop, {
      constrainWidth: false
    })
  },
  emits: ['click'],
  beforeDestroy () {
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  }
}
</script>
