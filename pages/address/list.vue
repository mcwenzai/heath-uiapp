<template>
	<view class="content page-height">
		<u-swipe-action
			style="margin-bottom: 20rpx"
			:show="item.show"
			:index="index"
			v-for="(item, index) in dataList"
			:key="index"
			@click="deleteItem(index, item)"
			@open="open"
			:options="options"
		>
			<view
				class="address-item flex-between-start"
				@click="chooseAddress(item)"
			>
				<view class="address column">
					<text
						>{{ item.provincesName }}{{ item.cityName
						}}{{ item.areaName }}{{ item.address }}</text
					>
					<text>{{ item.consignee }} {{ item.phone }}</text>
				</view>
				<image
					src="/static/images/edit.png"
					@click.stop="handleUpdate(item)"
					class="edit-icon"
				></image>
				<text
					class="default flex-center-center"
					v-if="item.isDefault === 1"
					>默认</text
				>
			</view>
		</u-swipe-action>
		<view class="address-item flex-between-center" @click="handleAdd(null)">
			<view class="flex-start-center">
				<image
					src="/static/images/cart/add.png"
					class="add-icon"
				></image
				>新增收件人
			</view>
			<image
				src="/static/images/arrow_left.png"
				class="small-arrow-icon"
				mode="aspectFit"
			></image>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			dataList: [],
			disabled: false,
			show: false,
			options: [
				{
					text: "删除",
					style: {
						backgroundColor: "#ff7247",
					},
				},
			],
			sourceType: "",
		};
	},
	onLoad(data) {
		this.getAddressList();
		this.sourceType = data.sourceType;
		this.dataList = uni.getStorageSync("addressList");
		uni.$on("getAddressList", (data) => {
			this.getAddressList();
		});
	},
	methods: {
		// 修改地址
		handleUpdate(params) {
			let url = `/pages/address/edit?id=${params.id}&userId=${params.userId}&cityCode=${params.cityCode}&address=${params.address}&consignee=${params.consignee}&phone=${params.phone}&isDefault=${params.isDefault}&sourceType=${this.sourceType}`;
			uni.navigateTo({
				url: url,
			});
		},
		// 添加地址
		handleAdd(params) {
			let url = "/pages/address/edit?sourceType=" + this.sourceType;
			uni.navigateTo({
				url: url,
			});
		},
		// 删除地址
		deleteItem(index, params) {
			this.$myRequest({
				method: "GET",
				url: "/user/userAddress/delete?id=" + params.id,
			})
				.then((res) => {
					if (res.success === 1) {
						// 删除成功，列表移除
						this.dataList.splice(index, 1);
					}
					uni.showToast({
						title: res.data,
						icon: "none",
					});
				})
				.catch((err) => {});
		},
		// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
		open(index) {
			// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
			// 原本为'false'，再次设置为'false'会无效
			this.dataList.forEach((items, indexs) => {
				if (items.id === this.dataList[index].id) {
					items.show = true;
				} else {
					items.show = false;
				}
			});
		},
		// 订单切换地址时触发，选择数据保存在本地的默认地址值
		chooseAddress(params) {
			if (this.sourceType < 2) {
				this.addressInfo = uni.setStorageSync("defaultAddress", params);
				uni.navigateBack();
			}
		},
		// 获取用户地址列表
		getAddressList() {
			let customerId = uni.getStorageSync("customerId");
			let defaultAddress = uni.getStorageSync("defaultAddress");
			this.$myRequest({
				method: "GET",
				url: "/user/userAddress/list?customerId=" + customerId,
			})
				.then((res) => {
					if (res.success === 1) {
						let datas = res.data;
						let defaultAddress = {};
						// 本地默认值判断存储
						datas.forEach((items, indexs) => {
							items.show = false;
							items.isDefault == 1
								? (defaultAddress = items)
								: (defaultAddress = datas[0]);
						});
						this.dataList = datas;
						uni.setStorageSync("addressList", this.dataList);
						if (!defaultAddress) {
							uni.setStorageSync(
								"defaultAddress",
								defaultAddress
							);
						}
					} else {
						uni.showToast({
							title: res.msg,
							icon: "none",
						});
					}
				})
				.catch((err) => {});
		},
	},
};
</script>

<style lang="scss" scoped>
.content {
	padding: 30rpx;
	background: #f7f6f6;
}
.address-item {
	position: relative;
	margin-bottom: 20rpx;
	padding: 30rpx;
	background: #ffffff;
	border-radius: 10rpx;
	font-size: 32rpx;
	line-height: 48rpx;
	color: #333;
	width: 690rpx;
	.address {
		margin-right: 50rpx;
		flex: 1;
	}
	.edit-icon {
		width: 34rpx;
		height: 34rpx;
	}
	.add-icon {
		margin-right: 10rpx;
		width: 32rpx;
		height: 32rpx;
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
}
</style>
