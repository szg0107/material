<template>
  <div class="category">
    <dl class="m-category">
      <dt>按拼音首字母选择：</dt>
      <dd :key="item" v-for="item in letterList">
        <a :href="`#city-${item}`">{{item}}</a>
      </dd>
    </dl>

    <dl :id="`city-${index}`" :key="index" class="m-category-section" v-for="(item,index) in cityGroup">
      <dt>{{index}}</dt>
      <dd>
        <span :key="items.id" @click="changeCity(items)" v-for="items in item">{{items.name}}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
  import http from '@/axios/api'

  export default {
    name: 'category',
    created () {
      http.getCityList().then(res => {
        // console.log(res)
        this.cityGroup = {}
        const serf = this
        res.data.data.forEach((item, index) => {
          if (!serf.cityGroup[item.firstChar.toUpperCase()]) {
            serf.cityGroup[item.firstChar.toUpperCase()] = []
          }
          serf.cityGroup[item.firstChar.toUpperCase()].push(item)
        })
      })
    },
    data () {
      return {
        letterList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'],
        cityGroup: {
          A: [
            {
              id: 1,
              name: '鞍山',
              firstChart: 'A'
            },
            {
              id: 2,
              name: '安庆',
              firstChart: 'A'
            },
            {
              id: 3,
              name: '安阳',
              firstChart: 'A'
            },
            {
              id: 4,
              name: '安顺',
              firstChart: 'A'
            },
            {
              id: 5,
              name: '安康',
              firstChart: 'A'
            },
            {
              id: 6,
              name: '安丘',
              firstChart: 'A'
            },
          ],
          B: [
            {
              id: 7,
              name: '北京',
              firstChart: 'B'
            },
            {
              id: 8,
              name: '包头',
              firstChart: 'B'
            },
            {
              id: 9,
              name: '保定',
              firstChart: 'B'
            },
          ],
          C: [
            {
              id: 10,
              name: '重庆',
              firstChart: 'C'
            },
            {
              id: 11,
              name: '成都',
              firstChart: 'C'
            },
            {
              id: 12,
              name: '常州',
              firstChart: 'C'
            },
          ],
          D: [
            {
              id: 13,
              name: '大连',
              firstChart: 'D'
            },
          ],
          E: [
            {
              id: 14,
              name: '鄂尔多斯',
              firstChart: 'E'
            },
          ],
          F: [
            {
              id: 15,
              name: '福州',
              firstChart: 'F'
            },
          ],
          G: [
            {
              id: 16,
              name: '广州',
              firstChart: 'G'
            },
          ],
          H: [
            {
              id: 17,
              name: '杭州',
              firstChart: 'H'
            },
          ],
          J: [
            {
              id: 18,
              name: '济南',
              firstChart: 'J'
            },
          ],
          K: [
            {
              id: 19,
              name: '昆明',
              firstChart: 'K'
            },
          ],
          L: [
            {
              id: 20,
              name: '连云港',
              firstChart: 'L'
            },
          ],
        }
      }
    },
    methods: {
      changeCity (item) {
        this.$store.dispatch('setPosition',{position:item})
        this.$router.push({name:'index'})
      }
    }
  }
</script>

<style lang="scss">
  @import '@/assets/css/changecity/category.scss';
</style>
