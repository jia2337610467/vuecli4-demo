<template>
  <div class="container">
    <div class="close" @click="handleRefuse">关闭</div>
    <div class="user-from">
      <img src="../assets/images/logo-small.png" alt="" />
      <i>匠人油卡 申请使用</i>
    </div>
    <div class="user-title">你的工匠人APP登录账户、头像 、昵称信息</div>
    <div class="user-detail">
      <ul>
        <li>
          <img src="../assets/images/gjr_default_logo.png" alt="" v-if="userPortrait == ''" />
          <img :src="userPortrait" alt="" v-else />
        </li>
        <li>
          <span v-if="nickName == ''">{{ mobile }}</span>
          <span v-else>{{ nickName }}</span>
          <i>个人信息</i>
        </li>
      </ul>
      <img src="../assets/images/icon-success.png" alt="" class="icon-success" />
    </div>
    <div class="control">
      <a href="javascript:;" @click="_handleCheckLogin">同意</a>
      <a href="javascript:;" class="btn-refuse" @click="handleRefuse">拒绝</a>
    </div>
  </div>
</template>

<script>
import { checkUserLogin } from '@/api/login';
import { Toast } from 'vant';

export default {
    name: 'login',
    data() {
        return {
            userFrom: '工匠人油卡',
            // token: "-1~-18~-106~-50~3~-78~43~89~34~-41~-87~13~22~-48~105~114~-17~126~-55~-74~96~80~2~19~-8~-76~35~116~43~-16~51~-25~37~47~59~65~-82~106~24~-12~26~32~-102~114~-122~-23~34~-80~-117~99~83~-20~34~-122~-18~-8~100~-54~-51~118~-123~86~-74~67~105~-34~-99~-1~-57~-4~68~95~59~124~99~-14~4~59~78~-8~-55~-84~-4~-25~54~37~20~19~28~61~-6~-45~105~-24~-79~-100~-51~-14~112~-23~-35~63~19~105~-36~98~21~72~73~29~-65~-19~-16~11~79~-64~-94~-28~-44~112~-69~22~11~118~-37~-112~-40~-112~98~124~48~6~-28~101~66~-104~49~80~102~-76~125~53~-44~-96~111~-45~-38~90~-31~-80~-63~0~-115~-119~71~75~71~-128~-15~-44~86~40~-64~-53~57~-3~-83~-7~51~-96~-5~32~73~55~30~-58~11~34~124~-118~-103~96~50~-104~-32~-16~121~85~0~-92~-61~-9~82~-74~38~75~29~84~-110~34~-77~24~-33~40~127~71~-119~-82~-44~-47~32~33~98~-30~-122~30~-87~-109~58~90~15~46~66~24~-103~117~-104~-69~126~-80~29~42~-106~-50~43~-52~-126~76~-83~74~62~80~-76~-24~-35~113~50~-40~-87~-109~58~90~15~46~66~24~-6~31~-45~118~-2~-64~-4~-120~-2~-73~-17~75~61~-104~97~-9~68~2~122~56~43~-3~7~-43~-6~31~-45~118~-2~-64~-4~-120~22~-85~72~108~-39~12~-19~-103~-3~-88~-75~-64~18~91~61~-20~16~-114~35~51~-88~-75~-107~-38~51~-96~-5~32~73~55~30~-58~-46~-53~-76~-48~42~96~-111~122~103~81~-95~12~3~35~-109~20~-118~-81~-2~-74~62~-42~124~-69~-77~-105~-60~111~-69~6~-46~75~10~87~-105~99~-106~-119~62~-11~21~-16~32~50~-25~32~46~-92~-13~36~-97~55~56~18~-16~-125~-126~-79~33~-110~79~-64~100~8~54~38~-85~-12~105~-65~58~-81~-87~-109~58~90~15~46~66~24~127~36~-45~36~114~46~-99~-110~-84~-12~-22~-66~-52~-12~-28~62~-25~-112~-5~-2~-56~50~-55~-57~51~-96~-5~32~73~55~30~-58~-4~-80~34~11~-56~-128~-27~-45~-78~118~-13~-118~-61~-111~-22~22~51~-96~-5~32~73~55~30~-58~-4~-80~34~11~-56~-128~-27~-45~103~-107~60~-95~-72~-109~38~64~-111~-82~-61~52~63~-80~63~69~91~-1~49~113~-123~69~38~84~114~101~-17~-16~98~-91~-10~21~-63~82~21~-82~-90~88~-7~102~-31~-72~-81~-36~105~-105~-98~-103~11~-111~-100~47~-31~-88~-111~76~66~86~-86~-10~116~56~-42~33~108~19~70~-87~-93~-94~-46~74",
            isRegiste: false,

            token: '',
            mobile: '', // 手机号
            nickName: '', // 昵称
            userPortrait: '', // 头像

            fullPathName: '',
            fullPathquery: {}
        };
    },
    created() {
        this._getUserInfo(); // 接受app传参
    },
    methods: {
        handleRefuse() {
            this.$callhandler('handleClose');// 拒绝授权
        },
        _getUserInfo() {
            this.fullPathName = this.$storage.get('pathName');
            this.fullPathquery = this.$storage.get('pathQuery');
            // 获取用户info
            this.$callhandler('getUserInfo', (res) => {
                let resData = JSON.parse(res);
                console.log(resData);
                this.token = resData.token;
                this.nickName = resData.userName;
                this.mobile = resData.mobile;
                this.userPortrait = resData.userPortrait;
            });
        },
        // 同意授权 检测用户是否登录
        _handleCheckLogin() {
            if (!this.token) {
                return false;
            }
            checkUserLogin(this.mobile, this.nickName, this.token).then((e) => {
                if (e.code === 0) {
                    // 保存
                    if (this.fullPathName === 'home') {
                        this.$router.replace({
                            name: 'home',
                            query: this.fullPathquery
                        });
                    } else {
                        this.$router.replace({ name: 'home' });
                    }
                } else {
                    Toast({
                        message: e.mag,
                        position: 'bottom',
                        duration: 2500
                    })
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 20px 24px 0;
  width: calc(100vw - 48px);
  min-height: 100vh;
  background-color: #fff;
}
.close {
  font-size: 17px;
  margin-bottom: 45px;
}
.user-from {
  display: flex;
  align-items: center;
  margin-bottom: 14px;
}
.user-from img {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}
.user-from i {
  color: #1a1a1a;
  font-size: 15px;
  font-style: normal;
}
.user-title {
  font-size: 23px;
  color: #131313;
  line-height: 32px;
  font-weight: 700;
}
.user-detail {
  height: 67px;
  border-bottom: 1px solid #e5e5e5;
  border-top: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 74px 0 80px;
}
.user-detail ul {
  display: flex;
  align-items: center;
}
.user-detail ul li img {
  width: 48px;
  height: 48px;
  border-radius: 3px;
  margin-right: 13px;
}
.user-detail ul span {
  font-size: 16px;
  color: #1a1a1a;
}
.user-detail ul i {
  font-size: 14px;
  color: #b5b5b5;
  display: block;
  margin-top: 8px;
  font-style: normal;
}
.icon-success {
  width: 16px;
  height: 11px;
}

.control a {
  width: 184px;
  height: 40px;
  line-height: 40px;
  background: #07c160;
  border-radius: 4px;
  font-size: 16px;
  color: #fefffe;
  text-align: center;
  margin: 0 auto;
  font-weight: 700;
  display: block;
}
.control .btn-refuse {
  background: #f2f2f2;
  color: #07c160;
  margin-top: 16px;
}
</style>
