import * as type from './mutations_types'
import jsCookie from 'js-cookie'

export default {
    namespaced: true,
    state: {
        token: jsCookie.get('OilCardToken') || '',
        id: jsCookie.get('OilCardId') || '',
        user: jsCookie.getJSON('OilCardUser') || {}
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
            try {
                state.commit(type.LOGIN, data);
            } catch (error) {

            }
        }
    },
    getters: {
        token(state) {
            return state.token
        },
        user(state) {
            console.log('state', state);
            return state.user
        }
    }
}
