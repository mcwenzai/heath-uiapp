<template>
	<view class="page-wrap">
		<top-navigation-bar></top-navigation-bar>
		<scroll-view scroll-y="true" class="container" :style="containerStyle">
			<view class="list">
				
				<block v-for="(item,index) in list" :key='item.id'>
					<view class="list-item app-f app-aic" @tap="goDocMain(item.doctorId)" >
						<image :src="item.teamUrl"></image>
						<view class="list-item-info app-f1 app-f app-fdc app-jcse">
							<image :src="item.introduceUrl" ></image>
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
				list:[]
			};
		},
		onLoad(options) {
			const data =  JSON.parse(decodeURIComponent(options.params))
			this.getList(data.doctorId)
		},
		methods:{
			goDocMain(id){
				this.$goPage('/pagesSpecialComing/docDetail/docDetail',{doctorId:id})
			},
			async getList(id){
				const res = await this.$myRequest({
					url:"/special/specialDoctorTeam/list",
					method:'POST',
					data:{doctorId:id}
				})
				if(!res || res.success !==1)return
				this.list=res.data.list
				// console.log(this.list)
			}
		}
	}
</script>

<style lang="scss" scoped>
.container{
	
	.list{
		padding: 0 30rpx 30rpx;
		.list-item{
			margin-top: 30rpx;
			// border: 1rpx solid #000;
			image{
				width: 214rpx;
				height: 214rpx;
				border-radius: 10rpx;
				// border: 1rpx solid #F0AD4E;
				margin-right:30rpx ;
			}
			.list-item-info{
				image{
					width: 100%;
					height: 214rpx;
				}
			}
		}
	}
	
}

</style>
