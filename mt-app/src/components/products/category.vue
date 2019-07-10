<template>
  <div class="m-product-category">
    <dl class="classic">
      <dt>分类</dt>
      <dt>全部</dt>
      <dd :key="item.type" v-for="item in classifyList">
        <my-select :list="item.subList" :name="item.title"/>
      </dd>
    </dl>

    <dl class="classic">
      <dt>区域</dt>
      <dt>全部</dt>
      <dd :key="item.type" v-for="item in areaList">
        <my-select :list="item.subList" :name="item.title"/>
      </dd>
    </dl>
  </div>
</template>

<script>
  import MySelect from './select'
  import http from '@/axios/api'

  export default {
    name: 'category',
    components: {MySelect},
    created () {
      http.getClassicList().then(res => {
        this.classifyList = res.data.data
      })
    },
    data () {
      return {
        classifyList: [
          {
            'title': '美食',
            'type': 'food',
            'subList': [
              {
                'name': '全部',
                'id': 'All'
              },
              {
                'name': '食品保健',
                'id': 'Food'
              },
              {
                'name': '特色菜',
                'id': 'Specialty'
              },
              {
                'name': '福建菜',
                'id': 'FJ'
              },
              {
                'name': '日本菜',
                'id': 'Japan'
              }
            ]
          },
          {
            'title': '酒店住宿',
            'type': 'hotel',
            'subList': [{
              'name': '温泉酒店',
              'id': 'hot_spring'
            }]
          }
        ],
        areaList: [
          {
            'title': '推荐商圈',
            'subList':
              [
                {
                  'name': '望京',
                  'id': 120000
                },
                {
                  'name': '昌平',
                  'id': 12222
                }
              ]
          },
          {
            'title': '南岗区',
            'subList': [
              {
                'name': '中央大街',
                'id': 123
              },
              {
                'name': '西客站',
                'id': 11
              },
              {
                'name': '花园街',
                'id': 222
              },
              {
                'name': '通乡街/果园街',
                'id': 21
              },
              {
                'name': '爱建社区',
                'id': 1
              },
              {
                'name': '学府路',
                'id': 34
              }
            ]
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
