<template>
  <div class="todo-footer">
        <label>
          <!-- 全选按钮 v-model即value值,就决定了:checked的值了 -->
          <input type="checkbox" v-model='isAll'>
        </label>
        <span>
          <span>Finished: {{doneTotal}}</span> / Total: {{total}}
        </span>
        <!-- 清除按钮 -->
        <button class="btn btn-danger" @click="clearAll">Clear All Finished</button>
    </div>
</template>

<script>
export default {
    name:'MyFooter',
    props:['todos'],
    methods:{
        // 触发清除事件
        clearAll(){
            if(confirm('确定全部清除已完成事件吗？')){
            this.$emit('clearAllTodo')
            }
        }
    },
    computed:{
        // 全部事项个数
        total(){
            return this.todos.length
        },
        // 已完成事项个数,reduce为数组的属性,将数组的每一个元素依次执行函数
        doneTotal(){
            return this.todos.reduce((pre,cur) => pre + (cur.done ? 1 : 0),0)
        },
        // 全选按钮,
        isAll:{
            get(){
                // console.log('获取值');
                return this.doneTotal === this.total && this.total > 0
            },
            set(value){
                // console.log('改变值');
                this.$emit('checkAllTodo',value)
            }
        },
        
    }
}
</script scoped>

<style>
/*footer*/
.todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
}

.todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
}

.todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
}

.todo-footer button {
    float: right;
    margin-top: 5px;
}
</style>