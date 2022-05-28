<template>
  <li>
       <label>
       <!-- 1 选择按钮, :checked是勾选状态, @change是原生dom事件.value值改变时触发-->
       <input type="checkbox" :checked='todo.done' @change='handleCheck(todo.id)'/>
       <!-- 2 展示每一个todo -->
       <span v-show="!todo.isEdit">{{todo.title}}</span>
       <!-- 5 编辑文本框 -->
       <input 
       v-show="todo.isEdit" 
       type="text" 
       :value='todo.title' 
       @blur='handleBlur(todo,$event)'
       ref='inputTitle'
       >
       </label>
       <!-- 3 删除按钮 -->
       <button class="btn btn-danger" @click='handleDelete(todo.id)'>Delete</button>
       <!-- 4 编辑按钮 -->
       <button class="btn btn-edit" v-show="!todo.isEdit" @click='handleEdit(todo)'>Edit</button>
    </li>
</template>

<script>
export default {
    name:'MyItem',
    // 接收来自父List的todo
    props:['todo'],
    methods:{
        // 勾选状态改变时,改变done值,
        handleCheck(id){
            this.$bus.$emit('checkTodo',id)
        },
        // 删除按钮
        handleDelete(id){
            if(confirm('确定删除吗?')){
            this.$bus.$emit('deleteTodo',id)
            }
        },
        // 编辑按钮，点击之后更改编辑状态isEdit为true
        handleEdit(todo){
            if(todo.hasOwnProperty('isEdit')){
                todo.isEdit=true
            }else{
                this.$set(todo,'isEdit',true)
            }
            // 更新数据之后再执行nextTick的回调函数,一点击编辑按钮，input框自动获取焦点
            this.$nextTick(function(){
                this.$refs.inputTitle.focus()
            })
        },
        // 输入框失去焦点时，触发updateTodo事件，将todo.title的值更新为输入框的文本
        handleBlur(todo,e){
            todo.isEdit=false
            if(!e.target.value.trim()) return alert('输入不能为空')
            this.$bus.$emit('updateTodo',todo.id,e.target.value)
        }
    }
}
</script scoped>

<style>
/*item*/

li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    /* border-bottom: 1px solid #ddd */
}

li label {
    float: left;
    cursor: pointer;
}

li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
}

li button {
    float: right;
    display: none;
    margin-top: 3px;
}

li:before {
    content: initial;
}

li:last-child {
    border-bottom: none;
}

li:hover{
    background-color: antiquewhite;
    color:rgb(121, 63, 58)
}
li:hover button{
    display: block;
}
</style>