<template>
  <div class="home">
    <van-nav-bar title="工匠人油卡" right-text="充值记录" />
    <div class="card">

    </div>
    <module msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import module from '@/components/module.vue';
import { getIndex } from 'api/index';
import { Toast, NavBar } from 'vant';
export default {
    name: 'home',
    components: {
        module,
        [NavBar.name]: NavBar
    },
    created() {
        this.test2333();
    },
    data() {
        return {

        }
    },
    mounted() {},
    methods: {
        async test2333() {
            try {
                await getIndex({ pageSiza: 100, num: 10 });
            } catch (err) {
                Toast({
                    message: '这里是home页面状态码不为200的error提示',
                    position: 'bottom',
                    duration: 2000
                });
                console.log('err', err);
            }
        }
    }
};
</script>
<style lang="scss" scoped>
    .card{
        margin: 10px 4%;
        height: 200px;
        box-shadow: 1px 0px 4px 4px yellow;
    }
</style>
