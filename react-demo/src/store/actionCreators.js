//创建action对象
function setValue(type,value){
    return{
        type,
        value
    }
}
function deleteItem(type,index) {
    return{
        type,
        index
    }
}
export {setValue,deleteItem}
