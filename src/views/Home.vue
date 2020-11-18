<template>
  <div class="home">
    <van-nav-bar title="工匠人油卡" right-text="充值记录" />
    <div class="card">

    </div>
    <module msg="工匠人油卡" />
  </div>
</template>

<script>
import module from '@/components/module.vue';
import { NavBar } from 'vant';
export default {
    name: 'home',
    components: {
        module,
        [NavBar.name]: NavBar
    },
    data() {
        return {

        }
    },
    mounted() {},
    methods: {}
};
</script>
<style lang="scss" scoped>
    .card{
        background-color: #FFF;
        margin: 10px 4%;
        height: 200px;
        border-radius: 5px;
        box-shadow: 1px 0px 4px 4px rgb(223, 223, 222);
    }
</style>
