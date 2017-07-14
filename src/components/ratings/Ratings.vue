<template>
	<div class="rating" ref="ratingbox">
		<div class="rating-box" >
			<div class="rating-top">
				<div class="rating-top-left">
					<div class="seller-score score-color">{{seller.score}}</div>
					<div class="rating-text">综合评分</div>
					<div class="gray-color">高于周边商家%</div>
				</div>
				<div class="rating-top-right">
					<ul>
						<li>
							<div class="rating-text">服务态度</div>
							<star class="star" :score="seller.serviceScore" :w="w" :h="h"></star>
							<div class="score-color">{{seller.serviceScore}}</div>
						</li>
						<li class="quality">
							<div class="rating-text">商品质量</div>
							<star :score="seller.foodScore" class="star" :w="w" :h="h"> </star>
							<div class="score-color">{{seller.foodScore}}</div>
						</li>
						<li>
							<div class="rating-text">送达时间<span class="gray-color deliveryTime ">{{seller.deliveryTime}}分钟</span></div>
						</li>
					</ul>
					
				</div>	
			</div>
			<div class="line"></div>
			<RatingComponet></RatingComponet>
		
			<div class="rating-list">
					<ul>
						<li v-for="rating in seletedRate" class="rating-li" >
							<img :src="rating.avatar">
							<div class="rating-li-right">
								<p>{{rating.username}}</p>
								<div><Star :score="rating.score" :w="w1" :h="h1" class="star"></Star><span v-if="rating.deliveryTime">{{rating.deliveryTime}}分钟</span></div>
								
								<div>{{rating.text}}</div>
								<div class="recommend-box">
									<span :class="ratePic[rating.rateType]"></span>
								<span v-for="recom in rating.recommend " class="rating-recommend">{{recom}}</span></div>
							</div>
							<div class="rate-time" v-show="rating.rateTime">{{rating.rateTime | formatTime}}</div>
						</li>
					</ul>
				</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {mapGetters} from 'vuex'
	import BScroll from 'better-scroll'
	import Star from '../detail/Score.vue'
	import Vue from 'vue'
	import RatingComponet from "../ratingsSelect/RatingComponet.vue"
	Vue.filter('formatTime',function(value){
		let today=new Date(value);
		let month=(today.getMonth()+1)<10?"0"+(today.getMonth()+1):(today.getMonth()+1);
		let date=today.getDate()<10?"0"+today.getDate():today.getDate();
		return today.getFullYear()+"-"+month+"-"+date+"  "+today.getHours()+":"+today.getMinutes();

	})
	export default {
		created(){
			this.$store.dispatch('getseller');	//引入seller数据
			this.$store.dispatch('getratings').then(() => {//引入seller数据
				this.$store.dispatch("changeType",2);
			});
		
		},
		data:function(){
			return{
				isSee:true,	
				w:"0.36rem",
				h:"0.36rem",
				w1:"0.24rem",
				h1:"0.24rem",
				ratePic:["icon-thumb_up","icon-thumb_down"]
			}	
		},
		watch:{
			seletedRate(){
				this.$nextTick(()=>{
					 setTimeout(()=>{
						if(!this.RatingsScroll)
						{	
							
							this.RatingsScroll = new BScroll(this.$refs.ratingbox,{click : true,})
						}
						else
						{
							this.RatingsScroll.refresh();
						}
					 },1000);
				})
			}

		},
		methods:{
		},
		components:{
			Star,
			RatingComponet
		},
		computed:{
			...mapGetters(['seller','ratings','seletedRate',"ratingArr"])	
		}
	}
</script>
<style lang="less" scoped>
	.rating
	{
		width: 100%;
		font-size: 0.24rem;
		overflow: hidden;
		position: absolute;
		top:3.5rem;
		left:0rem;
		bottom:0rem;
		height:auto;
		.rating-box
		{	
			padding-bottom: 0.1rem;
			.rating-top
			{	
				
				display: flex;
				padding:0.36rem 0rem;
				border-bottom: 1px solid rgba(7,17,27,0.1);
				.rating-text
				{
					font-size:0.24rem;
					font-weight: 700;
				}
				.gray-color{
					color:rgb(147,153,159)
				}
				.score-color
				{
					color:rgb(255,153,0);
					font-weight: 500;
				}				
				.rating-top-left
				{
					
					display: flex;
	    			align-items:center;
	    			flex-direction: column ;
	    			justify-content: space-around;
	    			width:2.75rem;
	    			.seller-score
	    			{
	    				font-size: 0.48rem;
	    				
	    			}

				}
				.rating-top-right
				{
				
					width:4.74rem;
					padding: 0rem 0.48rem;
					li{
						
						display: flex;
						justify-content:space-between;
						height: 0.48rem;
						line-height: 0.48rem;
						&.quality
						{
							margin:  0.16rem 0rem;
						}
						.deliveryTime
						{
							margin-left: 0.24rem;
						}

					}
				}

			}
			.line{
				background: #ccc;
				height: 0.32rem;
				border-bottom: 0.01rem solid rgba(7,17,27,0.1);
				border-top: 0.01rem solid rgba(7,17,27,0.1);

			}
			.rating-list
			{
				border-top:0.01rem solid rgba(7,17,27,0.1) ;
				padding:0 0.36rem;
				.rating-li{
					clear: both;
					padding:0.32rem 0rem;
					display:flex;
					font-size:0.2rem;
					color:rgb(147,153,159);
					justify-content: space-between;
					border-bottom: 0.01rem solid rgba(7,17,27,0.1);
						img{
							vertical-align: middle;
							margin-right: 0.24rem;
							width: 0.56rem;
							height: 0.56rem;
							border-radius: 0.28rem;
						}
					.rating-li-right
					{
						flex:1;
						.star
						{
							margin:0.08rem 0 0.12rem ;
							display: inline-block;
						}
						.recommend-box
						{
							margin-top:0.16rem ;
							.icon-thumb_up
							{
								color:rgb(0,160,220);
							}
							.rating-recommend
							{
								display: inline-block;
								width:0.8rem ;
								background:#ccc ;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
								margin-right:0.16rem ;
							}
						}
					
					}
				}
			}
		}
	}
</style>