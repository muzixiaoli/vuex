<template>
	<div class="seller" ref="sellerbox" >
		<div class="seller-box" >
			<div class="seller-top">
				<div class="seller-info">
					<div class="seller-info-left" >
						<div class="seller-name" ><span>{{seller.name}}</span></div>
						<div class="seller-rate">
							<Star :score="seller.score" class="seller-star" :w="w" :h="h"></Star> 
							<div class="seller-count">
								<span class="rating-count">({{seller.ratingCount}})</span>
								<span>月销{{seller.sellCount}}单</span>
							</div>	
						</div>
					</div>
					<!-- <div class="seller-info-right"><span class="icon-favorite" :class="{collected:flag }" @click="flag=!flag"></span><div>收藏</div> -->
					<div class="seller-info-right"><span class="icon-favorite" :class="{collected:flag }" @click="collection"></span><div>收藏</div>
					</div>
				</div>
				<div class="seller-send">
					<div class="seller-send-item">
						<p >起送价</p>
						<div><span>{{seller.minPrice}}</span>元</div>
					</div>
					<div class="seller-send-item item-border">
						<p>商家配送</p>
						<div><span>{{seller.deliveryPrice}}</span>元</div>
					</div>
					<div class="seller-send-item">
						<p>平均配送时间</p>
						<div><span>{{seller.deliveryTime}}</span>分钟</div>
					</div>
				</div>	
			</div>
			<div class="line"></div>
			<div class="activity">
				<h2 class="title-text">公告与活动</h2>
				<p>{{seller.bulletin}}</p>
				<ul>
					<li v-for="(active,k) in seller.supports " class="discont-list list-li">
							<img :src="'../../../static/img/'+url[k]" 
							alt="">
							<span>{{active.description}}</span>
						</li>
				</ul>
			</div>
			<div class="line"></div>
			<div class="seller-live">
				<p class="seller-live-text title-text">商家实景</p>
				<div class="seller-live-pics" ref="pics">
					<!-- <ul  :style="{width:ulWidth}" > -->
					<ul class="img-ul" ref="picsUl">
						<li class="pics-box" v-for="(pic,k) in seller.pics">
							<img :src="pic" ref="pic">
						</li>
					</ul>
				</div>
			</div>
			<div class="line"></div>
			<div class="seller-detail">
				<p class="seller-detail-text title-text">商家信息</p>
				<ul>
					<li v-for="(info,k) in seller.infos " class="list-li">
							<span>{{info}}</span>
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
	import ShopCart from '../shopcart/ShopCart.vue' 
	export default {
		
		created(){
			this.$store.dispatch('getseller');
			//localStorage存储收藏标志
			if(localStorage.getItem('collectionFlag'))
			{
				this.flag=localStorage.getItem('collectionFlag')

			}
			
		},
		data:function(){
			return{
				flag:false,
				url:["decrease_2@2x.png","discount_2@2x.png","discount_2@2x.png","special_2@2x.png","special_2@2x.png"],
				w:"0.36rem",
				h:"0.36rem",
				ulWidth:""
			}	
		},
		watch:{
			//
			seller(){
				this.$nextTick(()=>{
					setTimeout(()=>{
						this.initScroll();
						this.picsScroll();
					},1000)
					
				})
			}
		},
		methods:{
			collection(){
				this.flag=true;
				localStorage.setItem("collectionFlag",true);
			},
			initScroll(){//页面初始化滚动
				if(!this.scroll){
					this.scroll=new BScroll(this.$refs.sellerbox,{
						click:true
					});
				}else{
					this.scroll.refresh();
				}
			},
			picsScroll(){ //商家图片初始化滚动
				// if (this.seller.pics) {
		          	// let picWidth = 240;
		          	// let margin = 12;
		          	// let width = (picWidth + margin) * this.seller.pics.length - margin;
		          	// this.$refs.picsUl.style.width = width + 'px';
					if (!this.picScroll) {
		              	this.picScroll = new BScroll(this.$refs.pics, {
		                	scrollX: true,
		                	eventPassthrough: 'vertical'
		              });
		            } else {
		              	this.picScroll.refresh();
		            }
		        // }  
		},
	},
		components:{
			Star,
			ShopCart
		},
		computed:{
			...mapGetters(['seller']),
			
	
		}
	}

</script>
<style lang="less" scoped>
	@rgbgray:rgba(7,17,27,0.1) ;
	.seller
	{
		width: 100%;
		overflow: hidden;
		position: absolute;
		top:3.5rem;
		bottom: 0rem;
		z-index: 5;
		background: #fff;
		//整个包裹的
		.seller-box
		{
			font-size: 0.24rem;
			padding-bottom:0.1rem ;
			//统一黑色标题
			.title-text
			{
				font-size:0.28rem;
				color:rgb(7,17,27);
				font-weight: 700;
			}
			.list-li
			{
				padding:  0.24rem 0.32rem;
				border-top:0.01rem solid @rgbgray;
				font-size: 0.21rem;
			}
			.seller-top
			{
				padding:0.36rem;
				.seller-info
				{
					height:1.52rem;
					border-bottom: 0.01rem solid @rgbgray;
					display: flex;
					justify-content: space-between;
					font-size:0.2rem;
					.seller-info-left
					{	
						.seller-rate
						{
							height: 0.36rem;
							.seller-star
							{
								float:left;
								height: 0.36rem;

							}
							.seller-count
							{
								float:right;
								height: 0.36rem;
								line-height: 0.36rem;
								 margin-left:0.16rem ;
								span
								{
									margin-right:0.24rem ;

								}
							}
						
						}
						.seller-name
						{
							font-size:0.28rem;
							color:rgb(7,17,27);
							font-weight: bold;
							margin-bottom:0.16rem;
						}

					}
					
					.seller-info-right
					{
						
						.icon-favorite
						{
							font-size: 0.48rem;
							
						}
						div
						{
						font-size:0.2rem;
						color:rgb(77,85,93);
						margin-top: 0.08rem;
						}
					}

				}
				.seller-send
				{
					height:1.52rem;
					display: flex;
					justify-content: space-between;
					padding:0.36rem 0rem;
					font-size:0.2rem;
					color:rgb(7,17,27);
					align-items: center;
					
					&>.seller-send-item:last-child
					{
						border-right:none;
					}
					.seller-send-item 
					{
						width: 33.33%;
						text-align: center;
						
						border-right: 0.01rem solid rgba(7,17,27,0.1); 
						p{
							color:rgb(147,153,159);
							margin-bottom: 0.08rem;
						}
						span
						{
							font-size:0.48rem;
						}

					}

				}


			}
			.line
			{
				border-bottom: 1px solid @rgbgray;
				border-top: 1px solid @rgbgray;
				height: 0.32rem;
				background: #ccc;
			}
			.activity
			{
				padding:0.36rem 0.36rem 0rem;
				font-size:0.24rem;

				&>p
				{
					padding: 0.16rem 0.24rem 0.32rem;
					color:rgb(240,20,20);
					font-weight: 200;
					line-height: 0.48rem;
				}
				.discont-list
				{
					img
					{
						vertical-align: middle;
						margin-right: 0.12rem;
					}
				}
			}
			.seller-live
			{
				padding:0.36rem;
				&>p{
					margin-bottom: 0.24rem;
				}
				.seller-live-pics 
				{

					overflow: hidden;
					ul{
						width: 10.8rem;
						.pics-box
						{
							
							display: inline-block;
							padding-right: 0.12rem;
							
							img{
							width:2.4rem;
							height:1.8rem;
							
							}

						}
					}
					
					
					
				}
			}
			.seller-detail
			{
				padding:0.36rem 0.36rem 0rem;
				&>p{
					 margin-bottom: 0.24rem;
				}
			}

		}

	}
	.collected
	{
		color:rgb(240,20,20)
	}
</style>