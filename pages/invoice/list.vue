<template>
	<view class="content page-height">
		<u-swipe-action style="margin-bottom: 20rpx;" :show="item.show" :index="index"
					v-for="(item,index) in dataList" :key="index"
					@click="deleteItem(index,item)" @open="open"
					:options="options"
				>
			<view class="main" @click="chooseInvoice(item)">
				<view class="invoice-item column">
					<text class="title">{{item.invoiceHeader}}</text>
					<text class="text">税号:{{!item.invoiceNo?'暂无':item.invoiceNo}}</text>
				</view>
				<image src="/static/images/edit.png" @click.stop="handleDetail(item)" class="edit-icon"></image>
			</view>
		</u-swipe-action>
		<view class="invoice-item flex-between-center" style="width: 690rpx;" @click="handleDetail(null)">
			<view class="flex-start-center">
				<image src="/static/images/cart/add.png" class="add-icon"></image>新增发票
			</view>
			<image src="/static/images/arrow_left.png" class="small-arrow-icon"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList:[],
				disabled: false,
				btnWidth: 180,
				show: false,
				options: [
					{
						text: '删除',
						style: {
							backgroundColor: '#ff7247'
						}
					}
				],
				sourceType:''//来源类型
			};
		},
		onShow() {
			this.getList()
		},
		onLoad(data) {
			this.sourceType = data.sourceType
		},
		methods: {
			handleDetail(params) {
				let url = '/pages/invoice/edit'
				if(params){
					url = `/pages/invoice/edit?id=${params.id}&userId=${params.userId}&type=${params.type}&invoiceHeader=${params.invoiceHeader}&invoiceNo=${params.invoiceNo?params.invoiceNo:''}&phone=${!params.phone?'':params.phone}&bankAccount=${!params.bankAccount?'':params.bankAccount}&bankName=${!params.bankName?'':params.bankName}`
				}
				uni.navigateTo({
					url: url
				});
			},
			getList(){
				let customerId = uni.getStorageSync('customerId')
				this.$myRequest({
					method: "GET",
					url: '/user/userInvoice/list?customerId='+customerId
				}).then((res) => {
					if(res.success === 1){
						let datas = res.data
						datas.forEach((items, indexs) => {
								items.show = false
						});
						this.dataList = datas
						this.defaultInvoice = uni.setStorageSync("defaultInvoice",this.dataList[0]);
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
				}).catch((err) => {

				})
			},
			deleteItem(index, params) {
					this.$myRequest({
						method: "GET",
						url: '/user/userInvoice/delete?id=' + params.id
					}).then((res) => {
						if(res.success === 1){
							// 删除成功，列表移除
							this.dataList.splice(index, 1);
						}
						uni.showToast({
							title:res.data,
							icon:'none'
						})
					}).catch((err) => {

					})
				},
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.dataList[index].show = true;
				this.dataList.map((val, idx) => {0
					if(index != idx) this.dataList[idx].show = false;
				})
			},
			chooseInvoice(params){
				if(this.sourceType == 0 || this.sourceType == 1){
					uni.$emit('invoiceUpdate',params)
					uni.navigateBack()
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 30rpx;
		background: #f7f6f6;
	}
	.main{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.edit-icon {
		width: 34rpx;
		height: 34rpx;
		margin-right: 30rpx;
	}
	.invoice-item {
		position: relative;
		margin-bottom: 20rpx;
		padding: 30rpx;
		background: #ffffff;
		border-radius: 10rpx;
		font-size: 32rpx;
		color: #333;
		line-height: 48rpx;
		width: 640rpx;
		height
		.title {
			font-weight: bold;
		}
		.text {
			font-size: 28rpx;
			color: #666;
		}
		.add-icon {
			margin-right: 10rpx;
			width: 32rpx;
			height: 32rpx;
		}
	}
</style>
