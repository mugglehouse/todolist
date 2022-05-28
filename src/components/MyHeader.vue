<template>
   <div class="todo-header">
       <!-- v-modle为vulue值，keyup键盘事件触发add函数 -->
        <input 
        type="text" 
        placeholder="Please wirte down you ready to do " 
        v-model='title' 
        @keyup.enter='add'/>
    </div>
</template>

<script>
import {nanoid} from 'nanoid'
export default {
    name:'MyHeader',
    data(){
        return{
            title:''
        }
    },
    methods:{
        // 1、触发addTodo事件
        add(){
            // trim去掉前后空格
            if(!this.title.trim()) return alert('输入不能为空')
            // 定义事项对象
            const todoObj={
                id:nanoid(),
                title:this.title,
                done:false
            }
            // 触发addTodo事件，将todoObj传入app内的事件回调函数
            this.$emit('addTodo',todoObj)
            // 将value值恢复为空
            this.title=''
        },
    }
}
</script>

<style scoped>
/*header*/
.todo-header input {
    width: 560px;
    height: 28px;
    font-size: 14px;
    border: 1px solid #ccc; 
    border-radius: 4px;
    padding: 4px 7px;
    background-color: antiquewhite;
}

.todo-header input:focus {
    outline: none;
    border-color: rgba(82, 168, 236, 0.8);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
}
</style>