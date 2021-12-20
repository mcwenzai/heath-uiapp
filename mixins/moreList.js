export default {
	data() {
		return {
			timer: null,
			pageNum: 1,
			moreStatus: "more",
		};
	},
	methods: {
		startShowLoading() {
			if (this.pageNum === 1) {
				uni.showLoading({
					title: "加载中",
				});
			}
		},
		endHideLoading() {
			this.moreStatus = "more";
			if (this.pageNum === 1) {
				uni.hideLoading();
			}
		},
		initTimer() {
			clearTimeout(this.timer);
			this.timer = null;
		},
		initPageNum(list) {
			if (this.pageNum > 1 && (!list || list.length < 10)) {
				this.moreStatus = "noMore";
				this.pageNum--;
			}
		},
	},
};
