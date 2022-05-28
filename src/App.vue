<template>
  <div id="root">
  <div class="todo-container">
    <div class="todo-wrap">
        <h2>Muggle Daily Todolist</h2>
        <h4>{{date}}</h4>
     <!-- 子传父，@ + emit，给MyHeader组件绑定addTodo事件 -->
     <MyHeader @addTodo='addTodo'/>
     <!-- 父传子，props传送数据 -->
     <MyList :todos='todos'/>
     <!-- 祖传孙，底部有两个按钮，全选和清除全部 -->
     <MyFooter 
     :todos='todos' 
     @checkAllTodo='checkAllTodo' 
     @clearAllTodo='clearAllTodo'/>
    </div>
  </div>
</div>
</template>

<script>
import dayjs from 'dayjs'
import MyFooter from './components/MyFooter'
import MyHeader from './components/MyHeader'
import MyList from './components/MyList'
export default {
    name:'App',
    components:{
        MyFooter,MyHeader,MyList
    },
    data(){
        return{
            // 1、本地存储，读取todos值，todos是一个数组，里面存着多个对象
            todos:JSON.parse(localStorage.getItem('todos')) || [],
        }
    },
    methods:{
        // 头部--绑定addTodo事件
        addTodo(todoObj){
            this.todos.unshift(todoObj)
        },
        // ?????
        // item--绑定checktodo事件,勾选状态改变,done改变,祖传孙,利用全局事件总线
        checkTodo(id){
            this.todos.forEach((todo)=>{
                if(todo.id===id) todo.done = !todo.done
            })
        },
        // item--绑定deltetodo事件,点击删除按钮,返回新的todos,祖传孙,利用全局事件总线
        deleteTodo(id){
            this.todos=this.todos.filter( todo => todo.id !== id)
        },
        // ??????
        // item--绑定updateTodo事件，点击编辑按钮,祖传孙，利用全局事件
        updateTodo(id,title){
            this.todos.forEach((todo) => {
                if(todo.id === id) todo.title = title
            })
        },
        // 底部--绑定checkAllTodo全选事件--令所有todo的done与全选的done相等
        checkAllTodo(done){
            this.todos.forEach((todo)=>todo.done=done)
        },
        // 底部--绑定clearAllTodo清除事件--保留没有完成(false)的事件
        clearAllTodo(){
            this.todos=this.todos.filter( todo => !todo.done)
        }
    },
    computed:{
        date(){
           return dayjs(new Date()).format('YYYY-MM-DD');
        }
    },
    watch:{
         // 2、本地存储，设置todos值，使用监视属性watch，只要todos改变，本地存储跟着改变
        todos:{
            deep:true,
            handler(value){
                localStorage.setItem('todos',JSON.stringify(value))
            }
        }
    },
    // 3 全局事件总线
    // 绑定
    mounted(){
        this.$bus.$on('checkTodo',this.checkTodo),
        this.$bus.$on('deleteTodo',this.deleteTodo)
        this.$bus.$on('updateTodo',this.updateTodo)
    },
    // 释放
    beforeDestroy() {
        this.$bus.$off('checkTodo')
        this.$bus.$off('deleteTodo')
        this.$bus.$off('updateTodo')

    },
}
</script>

<style>
body {
    background: antiquewhite;
    color:antiquewhite
}

#root{
    margin-top: 50px;
}

h4{
    color: #000;
    /* margin: 0 auto; */
    text-align: center;
}

h2{
    text-align: center;
}

.btn {
    display: inline-block;
    padding: 4px 12px;
    margin-bottom: 0;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    /* background-color: rgb(155, 139, 139); */
}

.btn-danger {
    color: antiquewhite;
    background-color: rgb(159, 115, 103);
    border: 1px solid rgb(128, 82, 63);
}

.btn-edit {
    color:antiquewhite;
    background-color: #728978;
    border: 1px solid #537357;
    margin-right: 5px;
}

.btn-danger:hover {
    color:antiquewhite;
    background-color: #a57968;
}

.btn:focus {
    outline: none;
}

.todo-container {
    width: 600px;
    margin: 0 auto;
}

.todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: rgb(138, 70, 49);
}
</style>