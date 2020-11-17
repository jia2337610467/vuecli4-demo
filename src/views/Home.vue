<template>
  <div class="home">
    <van-nav-bar title="首页" left-text="返回" right-text="记录" left-arrow  />
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <div>
        获取token:
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
