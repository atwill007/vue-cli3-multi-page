<template>
  <div class="wrapper test-wrapper">
    <h1>Js forks on github Top{{repositories.length}}</h1>
    <ul class="repositories">
      <li v-for="item in repositories"
          :key="item.id"
          class="item">
        <div>
          <img :src="item.owner.avatar_url">
        </div>
        <div>
          <p>仓库名称: {{item.name}}</p>
          <p>owner: {{item.owner.login}}</p>
          <p>forks: {{item.forks}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>

export default {
  name: 'test',
  data () {
    return {
      totals: 0,
      repositories: []
    }
  },
  methods: {
    async getGitHubRepositories () {
      const params = {
        q: 'language:javascript',
        sort: 'stars'
      }
      let res = await this.$axios.get('/search/repositories', {
        params
      })
      if (typeof res === 'string') res = JSON.parse(res)
      this.totals = res.total_count
      this.repositories = res.items
    }
  },
  mounted () {
    this.getGitHubRepositories()
  }
}
</script>
<style lang="scss" scoped>

.test-wrapper {
  margin: 0 auto;
  max-width: 750px;
  padding: 20px;
  box-shadow: 0 0 5px #eee;
  h1 {
    font-size: 22px;
    text-align: center;
    color: rgb(238, 90, 22);
  }
  @at-root .repositories {

    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px;
      margin-bottom: 10px;
      box-shadow: 0 0 5px #ddd;
      div {
        &:nth-child(1) {
          flex: 0 0 25%;
          img {
            width: 100%;
          }
        }
        &:nth-child(2) {
          flex: 0 0 70%;
        }
      }
    }
  }
}
</style>
