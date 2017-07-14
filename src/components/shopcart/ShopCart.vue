<template>
	<div class="shopCart" >
		<div  class="shopBox" >
			<div class="shop-left"  @click="showshop">
		    	<div class="shop-wrap">
					<div class="shop-cart-box" :class="{cartActive:totalCount>0,cartNot:!totalCount}">
						<span class="icon-shopping_cart"></span>
					</div>
					<div v-if="totalCount" class="total-count" >{{totalCount}}</div>	
				</div>
				<div class="price" :class="{isPrice:totalPrice}">&yen;{{totalPrice}}</div>
				<div class="desc">另需配送费&yen;{{seller.deliveryPrice}}元</div>	
			</div>
			<div class="shop-right">
				<div v-show="totalPrice<seller.minPrice"><div v-show="!totalPrice">&yen;{{seller.minPrice}}起送</div><div v-show="totalPrice">还差&yen;{{seller.minPrice-totalPrice}}</div></div>
				<div v-show="totalPrice>=seller.minPrice" class
				="settlement">去结算</div>
			</div>
		</div>
		<ShopDetail :selectedfood="selectedfood" ></ShopDetail>
	</div>
</template>
<script type="text/javascript">
	import {mapGetters} from 'vuex'
	import Vue from 'vue'
	import ShopDetail from './ShopDetail.vue'
	export default {
		created(){
			this.$store.dispatch('getseller');
		},
		data:function()
		{
			return{
				shopFlag:false
				
			}
		},		
	props:{
			goods:{
				type:Array,
				default(){
					return []
				}
			}
		},
	methods:{
		showshop(){ 
			if(!this.totalCount){
					return;
				}
		
			if(this.shopShow)
			{
				this.$store.dispatch('hideShop');
					
			}
			else
			{
				this.$store.dispatch('showShop');
			}
		}	
		
	},
	computed:{
			...mapGetters(['seller','shopShow']),
			selectedfood(){
				let selectedFoods=[];

				this.goods.forEach((good)=>{
					good.foods.forEach((food)=>{
						if(food.count>0)
						{
							selectedFoods.push(food)
						}
					})
				})
				return selectedFoods
			},
			totalCount(){
				let totalcount=0;
				this.selectedfood.forEach((food)=>{
				
					totalcount+=food.count;	
				})
			
				return totalcount;
			},
			totalPrice(){
				let totalprice=0;
				this.selectedfood.forEach((food)=>{
				
					totalprice+=food.count*food.price;
				})
				
				return totalprice;
			}	
		 
		
	},
	components:{
		ShopDetail
	}
}
</script>
<style lang="less" scoped>
	.shopCart
	{
		position:fixed;
		width:100%;
		bottom:0rem;
		color:#fff;
		z-index: 10;
		.shopBox
		{
			height:1.1rem;
			line-height:1.1rem;
			background:#141d27;
			display:flex;
			// justify-content: space-between;

		.shop-left
		{
			
			height: 1.1rem;
			
			flex:1;
			.shop-wrap
			{
				box-sizing: border-box;
				position: absolute;
				bottom:0.2rem;
				left:0.24rem;
				background: #141d27;
				display: inline-block;
				border-radius:50%;
				padding:0 0.12rem;
				.shop-cart-box
				{

					background: #2b343c;
					text-align: center;
					width: 0.88rem;
					height:0.88rem;
					border: 0.12rem solid #141d27;
					border-radius:50%;
					vertical-align:middle;
					.icon-shopping_cart
					{
						font-size:0.48rem;
						color:rgba(255,255,255,0.4) ;
							
					}
					&.cartNot
					{
						background:#464648;;
					}
					&.cartActive
					{
						background: #3190e8;
					}
	
				}
				.total-count
				{
					position:absolute;
					top:0rem;
					 right:0rem;
					 text-align: center;
					 background: #ff461d;
					 display: block;
					 width:0.3rem ;
					 height: 0.3rem ;
					 line-height:0.3rem ;
					 border-radius:0.15rem ; 
					 color:#fff;
				}

			}
			.isPrice
			{
				color:#3190e8;
			}
			.price
			{	
				line-height: 1.1rem;
				margin-left:1.8rem;
				font-size: 0.32rem;
				display:inline-block; 
				padding-right: 0.24rem;
				border-right:0.02rem solid rgba(255,255,255,0.1) ; 
			}
			.desc
			{
			
				display:inline-block; 
				padding-left: 0.24rem;
			}
			
		}
		.shop-right
		{
			flex:0 0 2.1rem;
			width:2.1rem;
			background: #535356;
			height:1.1rem;
			line-height: 1.1rem;
			text-align: center;
			.settlement{
				background:orange;

			}
		}
	}
		
}
	
</style>