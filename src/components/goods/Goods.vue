<template>
	<div class="goods" >
	<!--菜单部分 -->
		<div class="goods-left" ref="menu">
			<ul>
				<li v-for="(menuItem,index) in goods" class="goods-left-li" :class="{'active':index===currentIndex}" @click="slectMenu($event,index)">
				<!--菜单小标识 -->
				<div class="img-box">
					<img src="../../../static/img/hot.png" alt="" v-if="menuItem.name.indexOf('热销')!=-1">
					<img src="../../../static/img/special_2@2x.png" alt="" v-if="menuItem.name.indexOf('特色')!=-1">
					<img src="../../../static/img/jing.png" alt="" v-if="menuItem.name.indexOf('精选')!=-1">
				</div>
				<span class="text">{{menuItem.name}}</span>
				</li>
			</ul>
		</div>
		<!--商品部分 -->
		<div class="goods-right" ref="food">
			 <ul>
				<li v-for="goodItem in goods" class="goods-right-li" >
					<div class="foods-name" >{{goodItem.name}}</div>
					<ul class="food-item-ul">
						<li v-for="food in goodItem.foods" class="food-item"  >
							<img :src="food.icon" @click="showFood(food)">
							<div class="food-main">
								<h3 >{{food.name}}</h3>
								<div class="food-desc">{{food.description}}</div>
								<div class="food-exact">
									<span>月销{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="food-price"><span class="new-price">&yen;{{food.price}}</span><span class="old-price" v-show="food.oldPrice">&yen;{{food.oldPrice}}</span></div>
							</div>
							<ShopCount class="count-box" :food="food"></ShopCount>	
						</li>
					</ul>
										
				</li>
			</ul>
		</div>
		<!--单个商品的 详情页-->
		<FoodDetail :food="food" ></FoodDetail>
		<!--购物车-->
		<ShopCart :goods="goods" ></ShopCart>	
	</div>
	
</template>
<script type="text/javascript">
	window.eventBus = new Vue();
	import Vue from 'vue'
	import {mapGetters} from 'vuex'
	import BScroll from 'better-scroll'
	import ShopCart from '../shopcart/ShopCart.vue'
	import ShopCount from '../shopcart/ShopCount.vue'
	import FoodDetail from '../detail/FoodDetail.vue'
	export default {
		created(){
			//创建的时候
			this.$store.dispatch('getgoods');
		},
		data: function () {
    	return {
    		heights: [],
    		scrollY: 0,
    		food:{},
    		//name:""
    		// foodDetail:false
    		}
  		},
  		
		watch:{
			// foodName:function (val, oldVal) {
			// 	this.$store.dispatch('saveMsg',val)
			// 	
			// },
			goods(){
				this.$nextTick(()=>{
				this._initScroll();
				this.getHeight();
				// if(!this.name){
				// 	this.name=this.goods[0].name;
				// }

			})
			}

		},
		components:{//加载组件
			ShopCart,
			ShopCount,
			FoodDetail
		},
		computed:{
			...mapGetters(['goods','foodDetail','fixedTitle']),
			// foodName(){
			// 	 // this.$store.dispatch('saveMsg',this.goods[this.currentIndex].name)
			// 	 return this.name;
			// },
			currentIndex(){//计算当前页
				for (let i=0;this.heights.length;i++)
				{
					let heightStart=this.heights[i];
					let heightEnd=this.heights[i+1];
					if(!heightEnd || this.scrollY>=heightStart&&this.scrollY<heightEnd)
					{

						//this.name=this.goods[i].name;
						return i
					}
				}
				return 0
			}
			
		},
		methods:{
			showFood(food){
				this.food=food;
				this.$store.dispatch('showFood');
				this.$store.dispatch("changeType",2);
			
				this.$store.dispatch('getfoodsFilter',food.ratings);
			},
			_initScroll()
			{
				this.menuScroll = new BScroll( this.$refs.menu , {
					 click : true
				});
				this.foodsScroll = new BScroll( this.$refs.food, {
					 click : true,
					probeType: 3
				});
				this.foodsScroll.on('scroll',(pos) => {
   				this.scrollY=Math.abs(Math.round(pos.y));
   				
   				 });
				
			},
			getHeight(){
				let foodList=document.getElementsByClassName('goods-right-li');
				let height=0;
				this.heights.push(height);
				for(let i=0; i<foodList.length;i++)
				{
					height+=foodList[i].clientHeight;
					
					this.heights.push(height);
				}		
				
			},
			slectMenu(event,index){
				let foodList=document.getElementsByClassName('goods-right-li');
        		this.foodsScroll.scrollToElement(foodList[index],200);

			},

		}
	}
</script>
<style lang="less" scoped>

	.goods{
		width: 100%;
		display:flex;
		position: absolute;
		top:3.5rem;
		bottom: 0.92rem;
		font-size: 0.24rem;
		overflow: hidden;
		.goods-left
		{
			flex:0 0 1.6rem;
			width:1.6rem ;
			overflow: hidden;
			.img-box
			{
				display: inline-block;
				height:1.08rem;
				line-height: 1.08rem;
				img{
					width:0.24rem;
					}
			}
			
			.goods-left-li{

				background-color: #f3f5f7;
				color:#333;
				&.active{
				background-color:#fff;
				color:#f01414;
					}
				width:1.12rem ;
				height:1.08rem;
				padding: 0 0.24rem; 
				display: table;
				text-align: center;
				.text{
					border-bottom: 0.01rem solid rgba(7,17,27,0.1);
					display: table-cell;
					vertical-align: middle;
				}

			}
			
		}
		.goods-right
		{
			flex:1;
			.goods-right-li{
			}
			.foods-name
			{
				padding-left:0.28rem;
				height:0.52rem;
				line-height:0.52rem;
				background:#f3f5f7;
				border-left:0.05rem solid  #d9dde1;
				font-size:0.24rem;
				color:rgb(174,153,159);
				
			}
			
			.food-item
			{
				padding: 0.36rem 0rem;
				display: flex;
				font-size:0.2rem;
				 position: relative;
				border-bottom: 0.01rem solid rgba(7,17,27,0.1);
				margin-left: 0.36rem;
				margin-right: 0.36rem;

				img
				{
					flex:0 0 1.14rem ;
					margin-right: 0.2rem;
					border-radius: 0.1rem;
				}
				.food-main {
					flex:1;
					h3
					{
						margin:0.04rem 0rem 0.16rem;
						font-size:0.28rem;
					}
					.food-desc 
					{
						//display: inline-block;
						margin-bottom: 0.16rem;
						
					}
					.food-exact
					{
						margin-bottom: 0.16rem;
						span
						{
							margin-right: 0.24rem;
						}
					 
					}
					.food-price
					{
						
						.new-price
						{
							font-size:0.28rem;
							color:rgb(255,0,0);
							font-weight: 700;
							line-height: 0.48rem;
							margin-right: 0.16rem;
						}
						.old-price
						{
							font-size:0.2rem;
							color:rgb(147,153,159);
							font-weight: 700;
							line-height: 0.48rem;
						}
					}

				
				}
				
			}


		}
		
	}
	.food-item-ul li:last-child{
					border-bottom: 0rem solid rgba(7,17,27,0.1);
				}
	
	.count-box
	{
		position: absolute;
		right: 0.48rem;
		bottom:0.4rem;
		right: 0;
		bottom: 12px;
	}

			
</style>