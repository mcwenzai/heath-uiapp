<template>
	<view class="page-wrap">
		
		<scroll-view scroll-y="true" class="container">
			<view class="content">
				<block v-for="(item,index) in list" :key='index'>
					<view class="content-item" v-if='item.list.length'>
						<view class="item-title">{{item.name}}</view>
						<view class="item-wrap app-f app-f-fww">
							<block v-for="(con,conIdx) in item.list" :key='conIdx'>
								<view class="item-item app-f app-f-aic app-f-jcc" @tap="goDetail(con)">{{con.name}}</view>
							</block>
						</view>
					</view>
				</block>
			</view>
		</scroll-view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				
			};
		},
		onLoad() {
	
			this.getList()
		},
		
		methods:{
			async goDetail(obj){
				const res = await this.$toolRequest({
					url:'/tool/toolAcupoints/getById',
					data:{
						id:obj.id
					}
				})
				
				if(res.success !==1){
					return uni.showToast({title:'获取详情失败',icon:"none"})
				}
				this.$goPage('/pagesTool/acupointDetails/acupointDetails',res.data)	
			},
			async getList(){
				const res = await this.$toolRequest({
					url:'/tool/toolAcupoints/acupointsList',
				})
				// console.log(res)
				if(res.success !==1) return
				this.list = res.data
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		height: 100%;
		.content {
			padding: 0 30rpx 30rpx;

			.content-item {
				 ;
				.item-title {
					text-align: center;
					padding: 60rpx 0 10rpx;
					font-size: 36rpx;
					color: #FF9E20;
					font-weight: 600;
				}
				.item-item{
					margin: 20rpx 10rpx 0;
					font-size: 32rpx;
					background-color: #eee;
					border-radius: 4rpx;
					height: 80rpx;
					padding: 0 30rpx;
					color: #666;
					width: 210rpx;
					line-height: 80rpx;
					text-align: center;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					overflow: hidden;
				}
			}
		}
	}
</style>
