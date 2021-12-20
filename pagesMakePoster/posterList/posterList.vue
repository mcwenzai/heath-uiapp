<template>
	<view class="page-wrap">
		<scroll-view scroll-y="true" class="container" >
			<view class="list-wrap app-f app-f-fww">
				<block v-for="(item,index) in list" :key='index'>
					<view class="list-item" @tap="goMake(item)">
						<image :src="item.detailUrl" mode="widthFix"></image>
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
				list:[],
				
			};
		},
		onLoad(options) {
			const data = JSON.parse(decodeURIComponent(options.params))
			// console.log(data)
			this.pageTitle = data.className
			uni.setNavigationBarTitle({
				title:data.className
			})
			
			this.getList(data.classId)
		},
		methods:{
			goMake(obj){
				this.$goPage('/pagesMakePoster/makePoster/makePoster',{url:obj.detailUrl})
			},
			async getList(id){
				const res = await this.$toolRequest({
					url:'/poster/posterTopicDetail/list',
					data:{
						topicId:id
					}
				})
				// console.log('海报列表',res)
				if(!res || res.success !==1)return
				const data = res.data
				this.list= data
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		height: 100vh;
	}
.list-wrap{
	.list-item{
		margin-top: 30rpx;
		margin-left: 30rpx;
		width: 330rpx;
		height: 458rpx;
		overflow: hidden;
		image{
			width: 100%;
			
		}
	}
}
</style>
