import tipCompon from '@/components/tip/tip.vue'

export default {
	data(){
		return {
			showTip:false,	
			tipText:'',
		}
	},
	components:{
		tipCompon
	},
	methods:{
		// 自定义提示框打开关闭
		tipShoworHide (msg){
			this.showTip = true
			this.tipText = msg
			setTimeout(() => {
				this.showTip = false
				this.tipText = ''
			}, 2000)
		}
	}
}