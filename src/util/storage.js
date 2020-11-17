export const storage = {
    set (key, object, outtime) { // localStorage
        let ctime = parseInt(Date.now() / 1000) // 获取存数据的时间
        let exp = outtime || 24 * 60 * 60 // outtime秒为单位的过期时间
        let outObj = {
            outime: ctime + exp,
            data: object
        }
        sessionStorage.setItem(key, JSON.stringify(outObj))
    },
    get (key) {
        let data = JSON.parse(sessionStorage.getItem(key))
        // console.log(data, '-------')
        // 初始化没有数据
        if (!data) {
            return false
        } else {
            return data.data
        }
        // 判断过期时间 和获取数据的时间对比  大于过期时间说明超时
        // console.log(data.outime, parseInt(Date.now() / 1000))
        // if (data.outime >= parseInt(Date.now() / 1000)) {
        //   return data.data
        // } else {
        //   return false
        // }
    },
    clear () {
        sessionStorage.clear()
    },
    removeItem (key) {
        sessionStorage.removeItem(key)
    }
}
