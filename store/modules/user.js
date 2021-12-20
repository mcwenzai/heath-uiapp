const state = {
	userInfo: uni.getStorageSync('userInfo')||{},
}
const mutations = {
	setUserInfo (state,info){
		// console.log(info)
		state.userInfo = info
	}
}

export default {
	namespaced:true,
	state,
	mutations
}