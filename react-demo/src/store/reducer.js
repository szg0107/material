import * as actionTypes from "./actionTypes";
//定义初始数据
const initState = {
    inpVal: '',
    list: [],
};
//state初始数据，action更改数据对象
export default (state = initState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case actionTypes.CHANGE_INPUT_VAL:
            /**reducer不能直接更改数据；需要先复制一份，然后更改复制的，将复制的返回出去。
             返回之后会自动的将原来的state变成新的state*/
            newState.inpVal = action.value;
            return newState;
        case actionTypes.ADD_TODO_ITEM:
            newState.list.push(action.value);
            newState.inpVal = '';
            return newState;
        case actionTypes.DELETE_TODO_ITEM:
            newState.list.splice(action.index, 1);
            return newState;
        default:
            break;
    }
    return state
}
