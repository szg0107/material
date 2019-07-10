<template>
  <div :class="['choose-wrap', disabled?'disabled':'']" @click="showWrapper" v-document_click="documentClick">
    <div class="choose">
      <span>{{value}}</span>
      <i class="el-icon-caret-bottom"/>
      <div :class="{'mt-content':true,'active':showWrapperActive}">
        <h2>{{title}}</h2>
        <div :class="['wrapper',className]">
          <div class="col">
            <span :class="{'mt-item':true,active:item.name===value}" :key="index" @click.stop="changeValue(item)"
                  v-for="(item,index) in list">{{item.name}}</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'mySelect',
    data () {
      return {}
    },
    props: ['list', 'title', 'value', 'showWrapperActive', 'disabled','className'],
    methods: {
      showWrapper (e) {
        e.stopPropagation()
        if (!this.disabled){
          this.$emit('change_active', true)
        }
      },
      documentClick () {
        this.$emit('change_active', false)
      },
      changeValue (item) {
        this.$emit('change', item)
        this.$emit('change_active', false)
      }
    },
    // 自定义局部指令
    directives: {
      document_click: {
        bind: function (el, binding) {
          document.addEventListener('click', binding.value, false)
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '@/assets/css/changecity/select.scss';
</style>
