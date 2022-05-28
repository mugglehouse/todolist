<template>
  <ul class="todo-main">
      <!-- v-for（todoObj,index）遍历todos，顺便利用父传子props，给item传送每一个todo -->
         <MyItem 
         v-for='(todoObj) in todos' 
         :key='todoObj.id'
         :todo='todoObj'
         />
    </ul>
</template>

<script>
import MyItem from './MyItem.vue'
export default {
    name:'MyList',
    components:{
        MyItem
    },
    // 接收父App传来的数据
    props:['todos'],

}
</script>

<style scoped>
/*main*/
.todo-main {
    margin-left: 0px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
}

.todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
}
</style>