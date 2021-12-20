<template>
  <div>
    <div>
      <div class="page-title">
        <h3>Категории</h3>
      </div>
      <section>
        <loader v-if="loading" />
        <div class="row" v-else>

          <category-create @create="addNewCategory" />
          <category-edit
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + numberr"
          @created="editCategory"
          @deleted="deleteCategory"
          />
          <p v-else class="center">Категорий пока нет, добавьте категорию</p>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import categoryCreate from '@/components/categoryCreate'
import categoryEdit from '@/components/categoryEdit'
export default {
  name: 'categories',
  data () {
    return {
      categories: [],
      loading: true,
      numberr: 0
    }
  },
  async mounted () {
    try {
      this.categories = await this.$store.dispatch('fetchCategories')
    } catch (e) {}
    this.loading = false
  },
  methods: {
    addNewCategory (categ) {
      this.categories.push(categ)
    },
    editCategory (category) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].limit = category.limit
      this.categories[idx].title = category.title
      this.numberr++
    },
    deleteCategory (idx) {
      this.categories = this.categories.filter(c => c.id !== idx)
    }
  },
  components: { categoryCreate, categoryEdit }
}
</script>
