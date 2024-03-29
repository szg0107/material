// components/subscribe/cmp.js

import {SubscribeModel} from "../../models/subscribe.js"

const subscribeModel = new SubscribeModel()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tag: String,
        tagId: Number
    },

    /**
     * 组件的初始数据
     */
    data: {
        //初始样式
        class: 'common',
        myTagList: []
    },

    attached() {
        this.judgeTag()
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //点击事件
        onTap() {

            const mark = {
                tag: this.properties.tag,
                tagId: this.properties.tagId
            }
            

            if( this.data.class === 'common') {
                const myTagList = this.getMytagList()

                myTagList.push(mark)

                subscribeModel.setMyTagList( myTagList )


            } else {
        
                subscribeModel.removeMyTag( mark.tagId )

            }

            this.toggleClass()
            this.triggerEvent('tap')


        },
        //获取订阅列表
        getMytagList() {
            const myTagList = subscribeModel.getMytagList();
            this.setData({
                myTagList
            })

            return myTagList;

        },
        //对比订阅列表
        judgeTag() {
            const myTagList = this.getMytagList();

            myTagList.forEach( item => {
                if(item.tagId === this.properties.tagId) {
                    this.setData({
                        class: 'subscibe'
                    })
                }
            } )

        },
        //修改类名
        toggleClass() {
            let className = '';

            if( this.data.class === 'common') {
                className = 'subscribe';
            } else {
                className = 'common';
            }

            this.setData({
                class: className
            });
        }
    }
})
