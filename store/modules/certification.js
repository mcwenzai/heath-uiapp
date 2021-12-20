const state = {
	info: {},
};
const mutations = {
	setInfo(state, info) {
		state.info = { ...info };
		uni.setStorageSync("quaInfo", info);
	},
};

export default {
	namespaced: true,
	state,
	mutations,
};
