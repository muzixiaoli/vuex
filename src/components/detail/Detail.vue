
<template>
	<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
	<div class="detail" v-if="detailShow">
		<div class="seller-name">{{seller.name}}</div>
		<star class="star" :score="seller.score"></star>
		<div class="discont-info">
			<div class="discont-top">
				<div class="line"></div>
				<div>优惠信息</div>
				<div class="line"></div>
			</div>
			<!-- 打折信息 -->
			<ul>
				<li v-for="(active,k) in seller.supports " class="discont-list">
					<img :src="'../../../static/img/'+url[k]" 
					alt="">
					<span>{{active.description}}</span>
				</li>
			</ul>
		</div>
		<div>
			<div class="discont-top">
				<div class="line"></div>
				<div>商家公告</div>
				<div class="line"></div>

			</div>
			<div class="seller-info">
				{{seller.bulletin}}
			</div>
		
		</div>
		<div class="close" @click="hideDetail">
			<span class="icon-arrow_lift"></span>	
		</div>
	</div>
	</transition>
</template>
<script type="text/javascript">

	import {mapGetters} from 'vuex'
	import 'animate.css/animate.css'
	import star from './Score.vue'
	export default {
		created(){
			this.$store.dispatch('getseller')
		},
		data:function(){
			return{
				url:["decrease_2@2x.png","discount_2@2x.png","discount_2@2x.png","special_2@2x.png","special_2@2x.png"]
			}	
		},
		computed:{
			...mapGetters(['seller','detailShow']),
			// url(){
			// 	let arr=["decrease_2@2x.png","discount_2@2x.png","discount_2@2x.png","special_2@2x.png","special_2@2x.png"];
			// 	return arr;
			// }
		},
		components:{
			star
		},
		methods:{
			hideDetail(){
				this.$store.dispatch('hideDetail')
			}
			
		}

		
	}
</script>
<style lang="less" type="text/css">
	.detail{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 8rem;
		z-index: 666;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: rgba(7,17,27,0.8);
		color:#fff;
		text-align:center;
		margin:0 auto;

		font-size:0.2rem;
		
		.seller-name
		{
			margin:0rem auto 0.32rem;
			font-size:0.32rem;
			padding-top:1.28rem;
			height:0.32rem;
			line-height:0.32rem;
			font-weight:700;

		}	
		.star
		{
			width: 60% ;
			margin:0rem auto;
		}	
		.discont-info
		{
			margin:0.56rem auto;
			
		}
		.discont-top{
			display:flex;
			justify-content:space-between;
			align-items:center ;
			font-size:0.3rem;
			padding:0rem 0.72rem; 
			.line
			{
				width:2.24rem;
				height:0.05rem;
				background-color:rgba(255,255,255,0.2);
			}
		}
		ul
		{
			margin:0.56rem 0.96rem;
			text-align:left;
			li.discont-list
			{
				margin-bottom:0.24rem;
			}
		}
			
		.discont-list img
		{
			vertical-align:middle;
			margin-right:0.12rem;

		}
		.seller-info
		{
			padding:0.48rem 0.96rem;
			font-size:0.24rem;
			text-align:left;
			line-height:0.48rem;
		} 
		.close{
			width: 100%;
			position: absolute;
			top: 0.64rem;
			left:-40%;
			text-align: center;
			color:#fff;
			span
			{
				font-size:0.64rem;
			}
		}

	}

</style>