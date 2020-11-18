<template>
    <div class="index">
        <p class="index-head">4 0 4</p>
        <p>页面找不到咯</p>
        <van-button type="info" round block @click="goHome">回到首页</van-button>
    </div>
</template>

<script>
import { Button } from 'vant'
export default {
    components: {
        [Button.name]: Button
    },
    data() {
        return {

        }
    },
    methods: {
        goHome() {
            this.$router.replace({ path: '/' });
        }
    }
}
</script>

<style lang="scss" scoped>
    .index{
        width: calc(100% - 10%);
        padding: 5%;
        font-size: 22px;
        p{
            line-height: 100px;
        }
        &-head{
            font-size: 60px;
            font-weight: 600;
        }
    }
</style>
