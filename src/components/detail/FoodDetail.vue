<template>
	<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight" @before-enter="showFood(food)">
		<div class="food-show" v-if="foodDetail" ref="foodWrap">
			<div class="foodDetail-box">
				<div class="food-img">
					<img :src="food.image" alt="">
					<div class="arrow"  @click="hideFoods"><span class="icon-arrow_lift"></span></div>
				</div>
				<div class="food-buy bg-white">
					<div class="food-buy-left">
						<h2 class="food-name">{{food.name}}</h2>
						<div class="sell-count"><span>月销{{food.sellCount}}</span><span>好评率{{food.rating}}%</span></div>
						<div><span class="price">&yen;{{food.price}}</span><span>{{food.oldPrice}}</span></div>
					</div>
					<div class="food-buy-right">
						<div class="shop-cart" v-if="!food.count" @click="addFood($event)">加入购物车</div>
						<ShopCount class="count-box" :food="food" v-show="food.count"></ShopCount>
					</div>
				</div>
				<div class="line"></div>
				<div class="food-info bg-white" v-show="food.info">
					<h2>商品介绍</h2>
					<p class="food-info-text">{{food.info}}</p>
				</div>
				<div class="line" v-show="food.info"></div>
				<!-- <RatingSelect  :typeArr="typeArr" :food="food"></RatingSelect> -->
				<RatingComponet></RatingComponet>
				<div class="rating-list">
					<ul >
						<!-- <li v-for="ratings in food.ratings" class="rateings-li" > -->
						<li v-for="ratings in seletedRate" class="rateings-li" >

							<div class="ratings-left">
								<div class="rate-time">{{ratings.rateTime | formatTime}}</div>
								<div class="rate-text" ><span :class="ratePic[ratings.rateType]"></span>{{ratings.text}}</div>
							</div>
							<div class="ratings-right">
								<span>{{ratings.username}}</span><img :src="ratings.avatar" alt="">
							</div>
						</li>
					</ul>
				</div>	
			</div>
		</div>
	</transition>
</template>
<script type="text/javascript">
	
	import {mapGetters} from 'vuex'
	import Vue from 'vue'
	import BScroll from 'better-scroll'
	import ShopCount from '../shopcart/ShopCount.vue'
	import RatingComponet from "../ratingsSelect/RatingComponet.vue"
	export default {
		props:{
			food:{
				type:Object
			}
		},
		data:function(){
			return {
				emptyFlag:false,
				nowIndex:1,
				scrollY:0,
				typeArr:["全部","推荐",'吐槽'],
				ratePic:["icon-thumb_up","icon-thumb_down"]
			}
		},
		created(){

			
		},
		components:{
			ShopCount,
			
			RatingComponet

		},
		computed:{
			...mapGetters(['foodDetail','seletedRate']),

		},
		watch:{
			seletedRate(){
				this.$nextTick(() => {
					if(!this._ratingScroll)
					{
						this._ratingScroll=new BScroll(this.$refs.foodWrap,{click:true});
					}else
					{
						this._ratingScroll.refresh();	
					}
				})
			}

		},
		methods:{
			showFood(food)
			{
				this.$store.dispatch('selectFood',food)

			},
			addFood(e){
				console.log(e);
				
				if(!this.food.count)
				{
					Vue.set(this.food,"count",1);

				}
			else
				{
					this.food.count++;
				}
			},
			change(index){
				this.nowIndex=index;
			},
			hideFoods(){
				this.$store.dispatch('hideFood');	
			},
		// 	isShow(rating,selectType,emptyFlag)
		// 	{
				
		// 		if(selectType===2)
		// 		{
		// 			return true&&(emptyFlag?rating.text:true)
		// 		}
		// 		if(selectType===1)
		// 		{
		// 			return rating.rateType===selectType &&(emptyFlag?rating.text:true)
		// 		}
		// 		if(selectType===0)
		// 		{
		// 			return rating.rateType===selectType &&(emptyFlag?rating.text:true)
		// 		}

		// 	}
		
		 }
	}
</script>
<style lang="less" scoped>
	@rgbline:rgba(7,17,27,0.1);
	@fontsize24:0.24rem;
	.food-show{
		width: 100%;
		position: fixed;
		top:0rem;
		bottom: 1.1rem;
		font-size:@fontsize24;
		overflow: hidden;
		background:#fff;
		z-index: 8;
		.foodDetail-box{
			width: 100%;
			.bg-white
			{
				background: #fff;
			}
			.line
			{
				background: #ccc;
				height: 0.32rem;
				border-bottom: 0.01rem solid @rgbline;
				border-top: 0.01rem solid @rgbline;
			}
			.food-img
			{

				position: relative;
				width:100% ;
				padding-bottom:100%;
				img{
					width:100% ;
					height:100%;
					position:absolute;
					z-index:333 ;
				}
				.arrow
				{
					position:absolute;
					z-index:444 ;
					top:0.4rem;
					left:0.2rem;
					font-size:0.5rem ;
					color:#fff ;
				}
				
			}
			.food-buy
			{
				padding:0.36rem;
				display: flex;
				justify-content: space-between;
				.food-buy-left
				{
					font-size:0.2rem;
					.food-name{
						font-size:0.28rem;
						color:rgb(7,17,27);
						font-weight: 700;
	
					}
					.sell-count{
						margin:0.16rem 0rem 0.36rem;
						color:rgb(147,153,159)
					}
					.price
					{
						color:red;
						font-size: 0.28rem;
					}
				}
				.food-buy-right
				{
					.shop-cart
					{
						width:1.48rem ;
						height: 0.48rem;
						line-height: 0.48rem;
						text-align: center;
						color:#fff;
						font-size: 0.2rem;
						background:rgb(0,160,220);
						border-radius:@fontsize24;
						margin-top:0.8rem;
					}
					.count-box
					{
						margin-top:0.8rem;
					}
				}
			}
			.food-info{
				padding:0.36rem;
				font-size:0.24rem ;
				font-weight: 200;
				color:rgb(77,85,93);
				line-height: 0.48rem;
				h2{
					font-size:0.28rem ;
					font-weight: 700;
				}
				.food-info-text
				{
					padding:0rem 0.16rem;
				}
			}
			.rating-list
				{
					border-top:0.01rem solid rgba(7,17,27,0.1) ;
					padding:0 0.36rem;
					.rateings-li{
						padding:0.32rem 0rem;
						display:flex;
						font-size:0.2rem;
						color:rgb(147,153,159);
						justify-content: space-between;
						border-bottom: 0.01rem solid rgba(7,17,27,0.1);
						.ratings-left
						{
							.rate-time{
								margin-bottom: 0.2rem;
							}
							.rate-text
							{
								font-size:@fontsize24;
								color:rgb(7,17,27);
								line-height: 0.32rem;
								font-weight: 700;
								.icon-thumb_up{
									margin-right: 0.08rem;
									color:rgb(147,153,159);
								}
							}	
						}
						.ratings-right
						{
							img{
								vertical-align: middle;
								margin-left: 0.12rem;
								width: 0.24rem;
								height: 0.24rem;
								border-radius: 0.12rem;
							}
						}
					}
				}
				

		}
	
	}
	

	
</style>