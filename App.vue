<script>
	var {
		GlobalDataPublisher
	} = require("libs/publisher.js");
	export default {
		globalData: {
			customerId: '',
			customerData: null,
			statusBarHeight: '',
			deptId: '',
			employeeId: '',
			selectArray: [],
			failCauseList: []
		},
		onLaunch: function() {
			this.globalDataPublisher = new GlobalDataPublisher(this.globalData);
			let token = uni.getStorageSync("token");
			var customerId = uni.getStorageSync("customerId");
			var isSalesman = uni.getStorageSync("isSalesman");
			setTimeout(() => {
				// #ifdef APP-PLUS
				plus.navigator.closeSplashscreen();
				// #endif
			}, 2000);
			if (isSalesman) {
				uni.reLaunch({
					url: "/pages/salesman/index"
				});
			}
			// 普通用户关闭应用，无须再次登录
			if (token && !isSalesman) {
				uni.reLaunch({
					url: "/pages/index/index",
				});
			}

			// #ifdef APP-PLUS
			plus.push.addEventListener(
				"click",
				(msg) => {
					plus.runtime.launchApplication({
							pname: "com.zhenhe.hedaifu",
							extra: {
								url: "",
							},
						},
						function(e) {}
					);
					plus.push.clear();
					uni.navigateTo({
						url: "/pages/message/index"
					});
					uni.hideLoading();
				},
				false
			);
			// #endif
		}
	};
</script>

<style lang="scss">
	@import 'style/iconfont.css';
	@import "uview-ui/index.scss";

	/*每个页面公共css */
	body {
		background: #f7fafc;
	}

	page {
		width: 100%;
		height: 100%;
	}

	view,
	scroll-view,
	swiper,
	swiper-item,
	picker {
		box-sizing: border-box;
	}

	.page-wrap {
		height: 100%;
		overflow: hidden;
		position: relative;
	}

	.margin-20 {
		margin: 20upx;
	}

	.u-numberbox {
		border-radius: 4upx !important;
		border: 1upx solid #e9e9e9 !important;
	}

	.uicon-plus:before,
	.uicon-minus:before {
		color: #666 !important;
	}

	// flex 布局
	.app-f {
		display: flex;
	}

	.app-f-aic {
		align-items: center;
	}

	.app-f-jcc {
		justify-content: center;
	}

	.app-f-fdc {
		flex-direction: column;
	}

	.app-f-f1 {
		flex: 1;
	}

	.app-f-fww {
		flex-wrap: wrap;
	}

	.app-f-jcse {
		justify-content: space-evenly;
	}

	.app-f-jcfe {
		justify-content: flex-end;
	}

	/* // 绝对定位水平居中 */
	.abpo-level-center {
		transform: translateX(-50%);
		left: 50%;
		position: absolute;
	}

	.app-f-jcsb {
		justify-content: space-between;
	}

	button:after {
		border: none;
	}

	/* 重写checkbox圆角主题色 */
	uni-checkbox .uni-checkbox-input {
		width: 36upx !important;
		height: 36upx !important;
		border-radius: 30upx;
	}

	uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
		background: #ff7247;
	}

	uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked::before {
		width: 16upx;
		height: 20upx;
		line-height: 20upx;
		text-align: center;
		font-size: 18upx;
		color: #fff;
		background: transparent;
		transform: translate(-70%, -50%) scale(1);
		-webkit-transform: translate(-70%, -50%) scale(1);
		border-color: #ff7247;
	}

	uni-checkbox:not([disabled]) .uni-checkbox-input:hover {
		border-color: #ff7247;
	}
</style>
