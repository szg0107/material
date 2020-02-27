<template>
  <div class="wrap">
    <my-header/>
    <div class="content">

      <div class="left-menu">
        <dl class="menu-list">
          <dt>学生管理</dt>
          <router-link :to="{name:'StudentList'}" class="active list" data-id="student-list" tag="dd">学生列表</router-link>
          <router-link :to="{name:'AddStudent'}" class="add" data-id="add-student" tag="dd">新增学生</router-link>
          <template v-if="weight===0">
            <dt>用户管理</dt>
            <router-link :to="{name:'UserList'}" class="list" data-id="student-list" tag="dd">用户列表</router-link>
          </template>
        </dl>
      </div>

      <router-view/>
    </div>
  </div>
</template>
<script>
    import myHeader from "../components/Header";

    export default {
        name: 'index',
        data() {
            return {
                weight: JSON.parse(sessionStorage.getItem('userMessage')).weight,
            }
        },
        components: {
            myHeader,
        },
    }
</script>
<style lang="less" scoped>
  .wrap {
    height: 100vh;
  }

  .content {
    display: flex;
    height: calc(100vh - 4.5rem);
    .left-menu {
      width: 200px;
      height: 100%;
      background: url("../assets/img/bg2.jpg")  center center;
      background-size: cover;
      color: #b3bcc5;

      dl dt {
        font-weight: bold;
        padding-left: 8px;
      }

      dl dd {
        padding-left: 30px;
        cursor: pointer;
      }

      dl dd:hover {
        background-color: rgba(255, 255, 255, 0.5);
        color: #354457;
      }

      .router-link-exact-active {
        background-color: #ddd;
        color: #354457;
      }

      dl dt, dl dd {
        font-size: 14px;
        height: 40px;
        line-height: 40px;
      }
    }
  }


</style>
