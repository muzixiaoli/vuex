<template>
	<div class="header">
	<img :src="seller.avatar" alt="" class="head-bg">
		<div class="main">
			<img :src="seller.avatar" alt="" class="seller-avatar">
			<div class="seller-title">
				<div>
					<img src="../../../static/img/brand@2x.png" class="seller-brand">
					<span >{{seller.name}}</span>
				</div>
				<div class="seller-description">
					<span>{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
				</div>
				<div class="seller-activity" v-if="seller.supports">
					<img src="../../../static/img/decrease_1@2x.png" class="seller-discount"/>
					<span class="seller-discount-text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div class="sel-right" @click="showDetail">
				<span>5个</span>
				<span class="icon-keyboard_arrow_right"></span>
			</div>
		</div>		
	
	<div class="header-notice" @click="showDetail">
		<div>
			<img src="../../../static/img/bulletin@2x.png" alt="">
		</div>
		<div class="notice-text">
			<span  >{{seller.bulletin}}</span>
		</div>
		<div>
			<span class="icon-keyboard_arrow_right"></span>
		</div>
	</div>
	<Detail></Detail>
	</div>

</template>
<script type="text/javascript">
import {mapGetters} from 'vuex'
import Detail from '../detail/Detail.vue'
 
	export default {
		created(){
			this.$store.dispatch('getseller');

		},
		computed:{
			...mapGetters(['seller']),
			
		},
		components:{
			Detail
		},
		methods:{
			showDetail(){
				this.$store.dispatch('showDetail')
			}
		}
	}
</script>
<style lang="less" scoped>
	.header{	

			height:2.68rem;
			background:rgba(7, 17, 27, 0.2);	
			color:#fff;
				.head-bg
				{
					position: absolute;
					height:2.68rem;
					z-index:-1;
					opacity: 0.5;

				}
				.main{
				display:flex;
				padding-top:0.48rem ;
				margin-bottom:0.36rem;
				margin-left:0.48rem;
				position:relative;
				.seller-avatar{
					width:1.28rem;
					height:1.28rem;			
					border-radius:0.04rem; 			
				}
				.seller-title{
					margin-left:0.32rem;
					flex:1;
					height:1.28rem;							
					font-size:0.32rem;
					font-weight: bold;
					overflow: hidden; 
					white-space: nowrap;
					text-overflow: ellipsis;
					.seller-brand
					 {
					 	vertical-align: middle;
					 	width:0.5rem;
					 	height:0.35rem;
					 }
					.seller-discount
					{
						vertical-align: middle;
					 	width:0.3rem;
					 	height:0.3rem;
					}
					.seller-description
					{
						font-size:0.24rem;
						margin-top:0.16rem ;
						margin-bottom:0.2rem ; 
					}
					.seller-discount-text
					{
						font-size:0.2rem;
					}
				}
				.sel-right
				{
					display: flex;
					width:0.82rem;
					position:absolute;
					top:1.2rem;
					right:0.24rem;
					height:0.48rem;
					line-height: 0.48rem;
					font-size:0.2rem;
					padding: 0rem 0.16rem;
					border-radius: 0.24rem  0.24rem ;
					background:rgba(7, 17, 27, 0.1);
					justify-content: space-between;
					.icon-keyboard_arrow_right
					{
						// display:inline-block;
						line-height: 0.48rem;
						// flex:1;
					}
				}

	
		}
		.icon-keyboard_arrow_right
		{
			font-size:0.3rem;
			vertical-align: middle;

		}
		.header-notice{
			
			 height:0.56rem;
			 font-size:0.2rem;
			 background:rgba(0, 0, 0, 0.2);
			 padding:0rem 0.24rem;
			line-height:0.56rem;
			display:flex;
			justify-content: space-between;
			.notice-text{
			width: 80%;
			overflow: hidden; 
			white-space: nowrap;
			text-overflow: ellipsis;
			
			}
			img{
				 vertical-align: middle;
			}
		
		}
		
		
	}
		

</style>