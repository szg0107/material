<template>
  <div class="calendar">
    <div class="date-header">
      <div class="prev-month" @click="handlePrev"/>
      <!-- {{}} 差值表达式     -->
      <div class="show-date">{{ year }}年{{ month }}月{{ day }}日</div>
      <div class="next-month" @click="handleNext"/>
    </div>

    <div class="date-content">
      <div class="week-header">
        <div v-for="item in ['日','一','二','三','四','五','六']" :key="item">{{ item }}</div>
      </div>

      <div class="week-day">
        <div v-for="item in 42" :key="item" class="every-day">
          <!--当前月显示几号-->
          <div v-if="item-beginDay>0&&item-beginDay<=curDays"
               :class="{'now-day':`${year}-${month}-${item-beginDay}`===curDate,'active-day':`${year}-${month}-${item-beginDay}`===`${year}-${month}-${day}`}"
               :data-day="item - beginDay"
               @click="handleChooseDay">
            {{ item - beginDay }}
          </div>
          <!-- 上月显示几号=当前项-周几开始+上个月有多少天
               下月显示几号=当前项-周几开始-当前月有多少天-->
          <div v-else class="other-day">
            {{ item - beginDay > 0 ? item - beginDay - curDays : item - beginDay + prevDays }}
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'myCalendar', //自定义日历控件
  data() {
    return {
      year: null,
      month: null,
      day: null,
      curDate: null,
    }
  },
  created() {
    this.getInitTime();
  },
  methods: {
    // 获取当前年月日
    getInitTime() {
      const date = new Date();
      this.year = date.getFullYear();
      this.month = date.getMonth() + 1;
      this.day = date.getDate();
      this.curDate = `${this.year}-${this.month}-${this.day}`;
    },
    // 点击日期中的某一天
    handleChooseDay(e) {
      // 拿到绑定数据data中的值
      this.day = e.target.dataset.day;
    },
    // 上一个月
    handlePrev() {
      if (this.month === 1) {
        this.month = 12;
        this.year--;
      } else {
        this.month--;
      }
      this.computedDay();
    },
    // 上一个月
    handleNext() {
      if (this.month === 12) {
        this.month = 1;
        this.year++;
      } else {
        this.month++;
      }
      this.computedDay();
    },
    //判断选中日期是否大于当前月总天数
    computedDay() {
      // 获取当月总天数
      const allDay = new Date(this.year, this.month, 0).getDate();
      if (this.day > allDay) {
        this.day = allDay;
      }
    }
  },
  //计算属性
  computed: {
    //当前月1号从星期几开始0~6
    beginDay() {
      return new Date(this.year, this.month - 1, 1).getDay();
    },
    //当前月有多少天
    curDays() {
      return new Date(this.year, this.month, 0).getDate();
    },
    //上个月有多少天
    prevDays() {
      return new Date(this.year, this.month - 1, 0).getDate();
    }
  }
}
</script>

<style scoped>
.calendar {
  margin: 0 auto;
  width: 500px;
}

.date-header {
  display: flex;
  line-height: 30px;
}

.prev-month, .next-month {
  border: 15px solid transparent;
  width: 0;
  height: 0;
  cursor: pointer;
}

.prev-month {
  border-right-color: #029ae5;
}

.next-month {
  border-left-color: #029ae5;
}

.show-date {
  flex: 1;
  text-align: center;
  color: #029ae5;
}

.week-header {
  display: flex;
}

.week-header > div {
  flex: 1;
  text-align: center;
  line-height: 30px;
  background-color: #029ae5;
  color: #fff;
  font-weight: bolder;
}

.week-day {
  display: flex;
  flex-wrap: wrap;
}

.every-day {
  width: 14.28%;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
}

.other-day {
  color: #ccc;
}

.now-day {
  background-color: #029ae5;
  color: #fff;
  font-weight: 600;
}

.active-day:not(.now-day) {
  color: #029ae5;
  border: 2px solid #029ae5;
  line-height: 46px;
}
</style>
