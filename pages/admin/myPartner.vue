<template>
	<view class="content page-height">
			<view
				class="partner-item flex-between-start"
				v-for="(item, index) in dataList"
				:key="index"
			>
				<view class="partner column">
					<text>{{ item.name }} <text style="margin-left: 30rpx;">{{ item.phone }}</text></text>
					<text class="department">{{ item.deptName }}</text>
				</view>
				<view class="edit-icon">
					<image
					style="width: 50rpx;height: 50rpx;"
						src="/static/images/binding/phone.png"
						@click.stop="handlePhone(item)"
					></image>
				</view>
			</view>
			<view class="binding-partner" @click="bindingPartner">
				绑定合伙人
			</view>
			<!-- 无列表数据 -->
			<view
				class="empty"
				v-if="!dataList.length"
			>
				<image src="../../static/images/cart_empty.png" mode=""></image>
				<view class="title"> 暂无绑定合伙人 </view>
			</view>
	</view>
</template>

<script>
import { goPage } from "@/libs/tool";
export default {
	data() {
		return {
			dataList: [
			],
		};
	},
	onLoad(data) {
		this.getAddressList();
	},
	methods: {
		// 拨打电话
		handlePhone(params) {
			uni.makePhoneCall({
			    phoneNumber: params.phone
			});
		},
		// 获取用户地址列表
		getAddressList() {
			let customerId = uni.getStorageSync("customerId");
			this.$myRequest({
				method: "GET",
				url: "/oa/oaEmployee/partnerList?customerId=" + customerId,
			})
				.then((res) => {
					if (res.success === 1) {
						let datas = res.data;
						this.dataList = datas
					} else {
						uni.showToast({
							title: res.msg,
							icon: "none",
						});
					}
				})
				.catch((err) => {});
		},
		bindingPartner(){
			goPage("/pages/admin/binding");
		}
	},
};
</script>

<style lang="scss" scoped>
.content {
	padding: 30rpx;
	background: #f7f6f6;
	.binding-partner{
		width: 640rpx;
		height: 100rpx;
		border-radius: 50rpx;
		text-align: center;
		line-height: 100rpx;
		color: #ffffff;
		font-size: 34rpx;
		letter-spacing: 2rpx;
		font-weight: 600;
		position: absolute;
		left: 50%;
		bottom: 60upx;
		transform: translateX(-50%);
		background-color: #FF7247;
		box-shadow: 0 20rpx 40rpx -20rpx rgba(255,133,97,0.9);
	}
}
.partner-item {
	position: relative;
	margin-bottom: 20rpx;
	padding: 30rpx;
	background: #ffffff;
	border-radius: 10rpx;
	font-size: 32rpx;
	line-height: 48rpx;
	color: #333;
	width: 690rpx;
	.partner {
		margin-right: 50rpx;
		flex: 1;
		color: #333333;
	}
	.edit-icon {
		margin-top: 10rpx;
		width: 55rpx;
		height: 55rpx;
		border-radius: 50%;
	}
	.default {
		position: absolute;
		right: 20rpx;
		bottom: 20rpx;
		width: 74rpx;
		height: 40rpx;
		border: 1rpx solid #ff7247;
		border-radius: 20rpx;
		color: #ff7247;
		font-size: 24rpx;
	}
	.department{
		width: 380rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		font-size: 28rpx;
		color: #666666;
	}
}
.empty {
	width: 240rpx;
	height: 174rpx;
	margin: 300rpx auto;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	image {
		width: 133rpx;
		height: 97rpx;
	}
	.title {
		width: 240rpx;
		font-size: 32rpx;
		text-align: center;
		color: #666666;
		margin-top: 45rpx;
		padding-left: 10rpx;
	}
}
</style>
