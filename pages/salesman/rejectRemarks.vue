<template>
	<view class="container">
		<view class="con">
			<textarea v-model="content" placeholder="请输入备注..." />
		</view>
		<view class="floor">
			<text @click="rejectAuth()">确认提交</text>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	const app =  getApp();
	export default {
		data() {
			return {
				content: '',
				id: ''
			};
		},
		methods: {
			// 提交拒绝授权
			rejectAuth() {
				var selectAuthGoods = app.globalData.selectArray
				this.$myRequest({
					method: "POST",
					url: "/goods/goods/employeeAuthorize",
					data:{
						authorizeId: selectAuthGoods,
						state: 2,
						note: this.content
					}
				}).then((res) => {
					var isReject = true
					if(res.success == 1) {
						this.$refs.uToast.show({
							title: res.msg,
							type: 'success'
						})
						setTimeout(() => {
							uni.navigateTo({
								url: 'grant?isReject=' + isReject
							})
						}, 1500)
					} else {
						this.$refs.uToast.show({
							title: res.msg,
							type: 'error'
						})
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		background-color: #ffffff;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.container {
		padding: 0 40upx;
		background-color: #ffffff;
		.con {
			margin-top: 40upx;
			margin-bottom: 40upx;

			textarea {
				width: 100%;
				height: 320upx;
				border-radius: 20upx;
				background-color: #f9f9f9;
				font-size: 30upx;
				color: #333;
				padding: 30upx;
				box-sizing: border-box;
				border: 2upx solid #eeeeee;
			}
		}
	}

	.floor {
		width: 100%;
		height: 121upx;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;

		text {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 690upx;
			height: 90upx;
			background-color: #ff7247;
			border-radius: 50upx;
			font-size: 34upx;
			color: #fff;
		}
	}
</style>
