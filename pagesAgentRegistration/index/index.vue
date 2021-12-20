<template>
	<view class="page-wrap">
		<top-navigation-bar></top-navigation-bar>
		<scroll-view scroll-y="true" class="container" :style="containerStyle">
			
			<block v-for="(item,index) in list" :key = 'item.id'>
				<template v-if="item.doctorList.length">
					<view class="class-item" >
						<view class="class-title" >{{item.specialName}}</view>
						<view class="class-con-wrap">
							<image v-for="img in item.doctorList" :key='img.id' :src="img.coverUrl" @tap='goSpecial(img)'></image>
							
						</view>
					</view>
				</template>
			</block>
			
			
			
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
			goSpecial(obj){
				this.$goPage('/pagesAgentRegistration/specialDoc/specialDoc',obj)
			},
			async getList(){
				const res = await this.$myRequest({
					url:'/special/specialTopic/list',
				})
				// console.log(res,'专题列表')
				if(!res || res.success !==1)return
				this.list= res.data
			}
		}
	}
</script>

<style lang="scss" scoped>
.container{
	padding: 0 30rpx 30rpx;
	.class-item{
		margin-top: 30rpx;
		.class-title{
		
			font-size: 36rpx;
		
			font-weight: 500;
			
			color: #333333;
			letter-spacing: 4rpx;
		}
		.class-con-wrap{
			image{
				width: 680rpx;
				height: 347rpx;
				margin-top: 30rpx;
				// border: 1rpx solid #FF991E;
			}
		}
	}
}
</style>
