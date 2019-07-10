import './css/demo.less';
import $ from 'jquery'
import {sum1} from './js/sum';
console.log(sum1());
$('div').html('<a>111</a>');
//使js支持热更新
if (module.hot) {
    module.hot.accept();
}
