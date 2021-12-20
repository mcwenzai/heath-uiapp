<template>
	<view class="page-wrap">
		<scroll-view scroll-y="true" class="container">
			<view class="list-wrap app-f app-f-fww">
				<block v-for="(item,index) in list" :key='index'>
					<view class="list-item">
						<view class="image-wrap" @tap="goList(item)">
							<image :src="item.topicUrl" mode="widthFix"></image>
							<view>共计{{item.posterNum || 0}}张</view>
						</view>
						<view class="item-title">{{item.topicName}}</view>
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
				list:[]
			};
		},
		onLoad() {
			this.getList()
		},
		
		methods:{
			goList(obj){
				this.$goPage('/pagesMakePoster/posterList/posterList',{classId:obj.id,className:obj.topicName})
			},
			async getList(){
				const res =await this.$toolRequest({
					url:'/poster/posterTopic/list'
				})
				// console.log('海报分类',res)
				if(!res || res.success !==1) return
				const data = res.data
				
				this.list=data
			}
		}
	}
</script>

<style lang="scss" scoped>
.container{
	padding: 0 0rpx 30rpx;
	height: 100vh;
	.list-wrap{
		.list-item{
			margin-top: 30rpx;
			margin-left: 30rpx;
			width: 330rpx;
			border-radius: 20rpx;
			
			.image-wrap{
				position: relative;
				width: 330rpx;
				height: 460rpx;
				overflow: hidden;
				view{
					position: absolute;
					bottom: 18rpx;
					right: 28rpx;
					color: #fff;
				}
			}
			image{
				width: 330rpx;
				
			}
			.item-title{
				
				text-align: center;
				font-size: 34rpx;
				
				font-weight: 700;
				
				color: #666;
				padding: 20rpx 0 50rpx;
			}
		}
	}
}
</style>
