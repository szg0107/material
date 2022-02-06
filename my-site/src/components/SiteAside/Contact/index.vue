<template>
  <ul class="contact-container">
    <li v-for="(item,index) in dataList" :key="item.type+index">
      <a :href='item.hrefText'>
        <div class="icon">
          <Icon :type="item.type"/>
        </div>
        <span>{{item.content}}</span>
      </a>
      <div class="pop" v-if="item.showPop">
        <img :src="item.popSrc" alt="" />
      </div>
    </li>
  </ul>
</template>

<script>
import Icon from '@/components/Icon/index.vue';

export default {
  name: 'Contact', // 联系方式
  components: {
    Icon,
  },
  data() {
    return {
      // 数据集合
      dataList: [
        {
          hrefText: '',
          type: 'github',
          content: 'DuYi-Edu',
          showPop: false,
          popSrc: '',
        },
        {
          hrefText: 'mailto:326636857@qq.com',
          type: 'mail',
          content: '326636857@qq.com',
          showPop: false,
          popSrc: '',
        },
        {
          hrefText: 'tencent://message/?Menu=yes&uin=326636857&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45',
          type: 'qq',
          content: '326636857',
          showPop: true,
          popSrc: 'https://qr.api.cli.im/newqr/create?data=326636857&level=H&transparent=0&bgcolor=%23FFFFFF&forecolor=%2F%2Fstatic.clewm.net%2Fcli%2Fimages%2Fbeautify%2Fnew%2Fforecolor%2F17.png&blockpixel=12&marginblock=2&logourl=&size=400&logoshape=no&embed_text_fontfamily=simhei.ttc&eye_use_fore=1&background=images%2Fbackground%2Fbg5.png&wper=0.7&hper=0.7&tper=0.15&lper=0.15&qrcode_eyes=&outcolor=&incolor=&body_type=0&qr_rotate=0&text=&fontfamily=msyh.ttf&fontsize=30&fontcolor=&logo_pos=0&kid=bizcliim&time=1644166445&key=5219168910d8812ec7d0d455db2ec77e',
        },
        {
          hrefText: '',
          type: 'weixin',
          content: 'szg0107',
          showPop: true,
          popSrc: 'https://developer.duyiedu.com/img/wexin.jpg',
        },
      ],
    };
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";

.contact-container {
  list-style: none;
  padding: 20px;
  margin: 0;
  color: @gray;
  @itemHeight: 30px;

  li {
    height: @itemHeight;
    line-height: 30px;
    margin: 14px 0;
    position: relative;

    &:hover {
      .pop {
        transform: scaleY(1);
      }
    }
  }

  a {
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  .icon {
    font-size: 26px;
    width: 36px;

    &.weixin {
      font-size: 32px;
      text-indent: -3px;
    }
  }

  .pop {
    position: absolute;
    left: 0;
    bottom: @itemHeight + 5px;
    padding: 10px 15px;
    background: #fff;
    border-radius: 5px;
    transform: scaleY(0);
    transform-origin: center bottom;
    transition: 0.3s;

    img {
      width: 150px;
      height: 150px;
    }

    &::after {
      content: "";
      position: absolute;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      width: 8px;
      height: 8px;
      background: #fff;
      bottom: -4px;
    }
  }
}
</style>
