<template>
    <div class="hello">
       组件接受值: {{msg}}
    </div>
</template>

<script>
export default {
    name: 'modules',
    props: {
        msg: {
            type: String,
            default: ''
        }
    },
    data() {
        return {

        }
    }
}
</script>
<style scoped lang="scss">
.hello{
    font-size: 18px;
}
</style>
