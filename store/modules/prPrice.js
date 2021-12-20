const state = {
	info: {
		name: "",
		id: null,
		goodsList: [null],
	},
	prTypeTxt: "克",
};

const mutations = {
	setInfo(state, info = {}) {
		state.info = {
			...info,
		};
	},
	delDrug(state, index) {
		const list = state.info.goodsList;
		// console.log(index)
		list.splice(index, 1);
		// console.log(list)
		if (list.length === 1) {
			state.info = {
				name: "",
				id: null,
				goodsList: [null],
			};
			// console.log(state.info);
		} else {
			state.info.goodsList = list;
		}
	},
	setPrTypeTxt(state, str) {
		state.prTypeTxt = str;
	},
};

export default {
	namespaced: true,
	state,
	mutations,
};
