<template>
	<view class="content page-height">
		<view class="form">
			<view class="form-item flex-between-center">
				<text class="label">收件人</text>
				<input placeholder="请输入收件人姓名" maxlength="10" v-model="entity.consignee" placeholder-style="font-szie: 34rpx; color: #bbb; font-weight: normal;"/>
			</view>
			<view class="form-item flex-between-center">
				<text class="label">手机号</text>
				<input maxlength="11" type="number" placeholder="请输入收件人手机号" v-model="entity.phone" placeholder-style="font-szie: 34rpx; color: #bbb; font-weight: normal;"/>
			</view>
				<!-- <view class="form-item flex-between-center">
					<text class="label">所在地区</text>
					<input placeholder="请选择收件人所在地区" v-model="region" placeholder-style="font-szie: 34rpx; color: #bbb; font-weight: normal;"/>
					<image src="/static/images/arrow_left.png" class="arrow-icon" mode="aspectFit"></image>
				</view>
			<view class="form-item flex-between-start">
				<text class="label">详细地址</text>
				<textarea maxlength="50" placeholder="请输入收件人详细地址" v-model="entity.address" placeholder-style="font-szie: 34rpx; color: #bbb; font-weight: normal;"/>
			</view> -->
		</view>
		<view class="default flex-center-center" @click="isDefault == 0?isDefault=1:isDefault=0">
			<image :src="isDefault==1 ? '/static/images/cart/circle-active.png' : '/static/images/cart/circle.png'"></image>
			设为默认
		</view>
		<view class="submit-btn flex-center-center" @click="submit">保存</view>
		<!-- 地址选择弹框 -->
		<!-- <u-picker confirm-color="#FF7247" v-model="showAddress" mode="region" @confirm="confirmAddress"></u-picker> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				entity:{},
				showAddress:false,
				title:'',//导航栏名称
				url:'',
				region:'',//默认区域值
				isDefault:0,
				sourceType:0

			};
		},
		onLoad(data) {
			!data.sourceType?'':this.sourceType = data.sourceType//由订单列表新建进入
			!data.consignee?this.title='新增收件人':this.title = '修改收件人'// 页面标题判断：null为新增
			!data.consignee?this.url='/user/userAddress/insert':this.url = '/user/userAddress/update'// 接口判断
			if(data.consignee){
				this.getRegion(data.cityCode)
			}
			// 设置导航标题
			uni.setNavigationBarTitle({
				title:this.title
			})
			this.entity = data
			this.isDefault = data.isDefault
			this.region = uni.getStorageSync('cityInfo').addressName
			this.entity.address = uni.getStorageSync('quaInfo').address
		},
		methods:{
			submit(){
				const customerId = uni.getStorageSync("customerId");
				// 首先判断必填参数是否存在
				if (!this.entity.consignee  || !this.entity.phone) return uni.showToast({title: '请完善信息',icon: 'none'})
				let myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(19[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
				// 判断手机格式是否正确
				if (!myreg.test(this.entity.phone)) return uni.showToast({title: '请输入正确格式手机号',icon: 'none'})
				this.entity.isDefault = this.isDefault
				this.entity.customerId = customerId
				this.$myRequest({
					method: "POST",
					url: this.url,
					data:this.entity
				}).then((res) => {
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					if(res.success == 1){
						uni.setStorageSync('defaultAddress',res.data.address)
						let timer = setTimeout(function(){
							if(this.sourceType == 0 || this.sourceType == 1){
								// 订单跳转添加数据，返回直接到订单
								uni.redirectTo({
									url:'/pages/cart/order?sourceType='+this.sourceType
								})
							}else{
								// 地址管理列表添加数据
								uni.navigateBack()
							}
							// 更新地址列表数据
							uni.$emit('getAddressList')
						}.bind(this),1500)
					}
				})
			},
			/**
			 *  @param {*} param 地区编码
			 * */
			getRegion(param){
				let cityList = uni.getStorageSync('cityList')//本地保存区域编码信息
				let county = param
				let city = county.slice(0,4) + '00'
				let province = county.slice(0,2)+'0000'
				cityList.forEach((item,index)=>{
					if(item.code == province){
						province = item.name
					}
					if(item.code == city){
						city = item.name
					}
					if(item.code == county){
						county = item.name
					}
				})
				// 筛选直辖市
				let municipalityArr = ['110100','500100','120100','310100']
				if(municipalityArr.includes(city)){
					city = '直辖市'
				}
				this.region = `${province}/${city}/${county}`
			},
			/** 弹框选择地址
			 *  @param {*} e 省市区数据
			 * */
			confirmAddress(e) {
				this.region = e.province.label + '/' + e.city.label + '/' + e.area.label
				this.entity.cityCode = e.area.value
			},
		}

	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 30rpx;
		background: #f7f6f6;
	}
	.form {
		margin-bottom: 50rpx;
		background: #fff;
		border-radius: 10rpx;
		.form-item {
			padding: 30rpx;
			font-size: 32rpx;
			color: #333;
			input,
			textarea {
				flex: 1;
				margin-left: 60rpx;
				text-align: right;
				font-size: 34rpx;
				font-weight: bold;
				color: #333;
			}
			textarea {
				height: 150rpx;
			}
			.arrow-icon {
				margin-left: 10rpx;
				width: 28rpx;
				height: 27rpx;
			}
		}
	}
	.default {
		font-size: 30rpx;
		color: #666;
		image {
			margin-right: 10rpx;
			width: 36rpx;
			height: 36rpx;
		}
	}
	.submit-btn {
		position: fixed;
		left: 30rpx;
		right: 30rpx;
		bottom: 50rpx;
		height: 100rpx;
		background: #ff7247;
		border-radius: 50rpx;
		box-shadow: -15rpx 0rpx 0rpx NaNpx rgba(255,133,97,0.24);
		font-size: 34rpx;
		color: #fff;
	}
</style>
