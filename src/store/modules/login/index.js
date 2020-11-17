import * as type from './mutations_types'
import { getToken, getId, getUser } from '@/util/jsCookie'

export default {
    namespaced: true,
    state: {
        token: getToken() || '',
        id: getId() || '',
        user: getUser() || {}
    },
    mutations: {
        [type.LOGIN](state, data) {
            const userDate = data;
            state.token = userDate.token;
            state.user = userDate.user;
            state.id = userDate.id;
        }
    },
    actions: {
        login(state, data) {
            state.commit(type.LOGIN, data);
        }
    },
    getters: {
        token(state) {
            return state.token
        },
        user(state) {
            return state.user
        }
    }
}
