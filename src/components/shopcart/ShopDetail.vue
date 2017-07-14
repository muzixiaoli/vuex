<template>
	<div class="ShopDetail" v-show="shopShow">
		<div class="ShopDetail-box">
			<div class="ShopDetail-text"><span>购物车</span><span class="clear" @click="clear">清空</span></div>
			<div class="selected-wrap" ref="selectwrap">
				<ul>
					<li v-for="food  in selectedfood" v-show="food.count">
						<div class="food-item">
							<div class="selected-left">{{food.name}}</div>
							<div class="selected-right">
								<div >&yen;{{food.price}}</div>
							<ShopCount class="count-box" :food="food"></ShopCount>
							</div>
						</div>
					</li>
				</ul>
				
			</div>

			
		</div>
	</div>
</template>
<script type="text/javascript">
	import {mapGetters} from 'vuex'
	import ShopCount from './ShopCount.vue'
	import BScroll from 'better-scroll'
	import Vue from 'vue'
	export default {
	props:{
		selectedfood:{
				type:Array,
				default(){
					return []
				}
			},
	},
	components:{
		ShopCount
	},
	watch:{
			totalLen:function(newval,old){

				this.$nextTick(() => {
					setTimeout(()=>{
					if(!this._selectScroll){
					this._selectScroll=new BScroll(this.$refs.selectwrap,{
						click:true
					});
					}
					else{
						this._selectScroll.refresh();
					}
					},1000)
				})
				if(!newval)
				{
					this.$store.dispatch('hideShop')
				}
			}
			},
			selectedfood(){
			// 	this.$nextTick(() => {
			// 		console.log("jfh");
			// 		setTimeout(()=>{
			// 			if(!this._selectScroll){
			// 			this._selectScroll=new BScroll(this.$refs.selectwrap,{
			// 				click:true
			// 			});
			// 		}else{
			// 			this._selectScroll.refresh();
			// 		}
			// 		},1000)
			// 	})
			// }

		},
	computed:{
		...mapGetters(['shopShow']),
		totalLen(){
			return this.selectedfood.length;
		}
	},
	methods:{
		selectScroll()
		{
			this._selectScroll = new BScroll( this.$refs.selectwrap, {
				 click : true
			});
			
		},
		clear(){
			let flag=confirm("是否清空购物车内所有商品？")
			if(!flag)
			{
				return 
			}
			this.selectedfood.forEach((food)=>{
				food.count=0;
				 });
			this.$store.dispatch('hideShop');
			console.log(this.shopShow,"这些执行");
				
		}
	}
}
</script>
<style lang="less" scoped>
	.ShopDetail
	{
		position: fixed;
		// bottom: 2rem;
		top:0rem;
		left: 0rem;
		z-index: -1;
		width: 100%;
		height:100%;
		overflow: auto;
		 background-color: rgba(153,153,153,0.8);
		
		color:rgb(7,17,27);
		font-size: 0.28rem;
		.ShopDetail-box
		{
			width: 100%;
			position: absolute;
			bottom: 1.1rem;
			background-color: rgb(236,239,241);
		
			.ShopDetail-text
			{
				width: 6.77rem;
				&.fixed
				{
					position: fixed;
					top:50%;
				}
				height: 0.8rem;
				line-height: 0.8rem;
				display: flex;
				padding:0  0.36rem;
				justify-content:space-between;
				background: #eceff1;
				.clear
				{
					color:rgb(0,160,220);
				}
			}

			.selected-wrap
			{
				background: #fff;
				overflow: hidden;
				max-height:4rem;
				li
				{ width: 6.77rem;
					padding: 0 0.24rem; 
					display: table;
					padding:0  0.36rem;
					clear:both;
					height: 0.96rem;
					line-height:  0.96rem;
					.food-item{
						display: table-cell;
						border-bottom: 0.01rem solid rgba(7,17,27,0.1);
					}
					.selected-right
					{
						float: right;
						display: flex;
						justify-content:space-between;

					}
					.selected-left
					{
						float: left;

					}

				}
			}
		}
	}
</style>