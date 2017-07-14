<template>
	<div class="ratings-box bg-white">
				<div class="food-ratings ">
					<div class="ratings-count">
						<div class="all" :class="{active:2==selectedType}" @click.stop="change(2)">{{typeArr[0]}}
							<span>{{seletedRate.length}}</span>
						</div>
						<div class="recommend" :class="{active:0==selectedType}" @click.stop="change(0)">{{typeArr[1]}}
							<span>{{oks}}</span>
						</div>
						<div class="teasing" :class="{active:1==selectedType}" @click.stop="change(1)">{{typeArr[2]}}
							<span>{{nos}}</span>
						</div>
					</div>
				</div>
				<div class="ratings-show">
					<span class="icon-check_circle" @click="changeToggle" :class="{emptyChecked:onlyText}">
					</span>
					<span>只看有内容的评价</span>
				</div>
		</div>
</template>
<script type="text/javascript">
	import {mapGetters} from 'vuex'
	import Star from '../detail/Score.vue'
		export default {
	created(){
		this.$store.dispatch('changeType',2);
	},
	props:{
	},
	data:function(){
			return {
				
			}
		},
	methods:{
			change(_type){
				// 此方法是判断点击类型
				
				this.$store.dispatch('changeType',_type);
			},
			changeToggle()
			{
				// 此方法是判断是否显示内容
				this.$store.dispatch('toggle');
			}

		},
	computed:{
		...mapGetters(["ratings","seletedRate","onlyText","selectedType","typeArr"]),
		
		oks()
		{
			// 是评价满意长度
			return this.seletedRate.filter( rating => {
					return rating.rateType === 0;
				}).length;
		},
		nos()
		{
			// 是吐槽满意长度
		return this.seletedRate.filter(rating => {
				return rating.rateType === 1;
			}).length;
		}
	}
}
</script>
<style lang="less" scoped>
	.ratings-box
		{
			.food-ratings
			{
				padding:0.36rem ;
				font-size:0.24rem ;
				.ratings-count{

					.all
					{
						color:#ccc;
						background: #ebf5ff;
						&.active
						{
							color:#fff;
							background: #00a0dc;
						}
						
					}
					.recommend
					{
						color:#ccc;
						background: #ebf5ff;
						&.active
						{
							color:#fff;
							background: rgb(0,160,220);
						}
					}
					.teasing
					{
						color:#ccc;
						background: #f5f5f5;
						&.active
						{
							color:#fff;
							background: #ccc;
						}
					}
					&>div{
					display: inline-block;
					border-radius:0.2rem ;
					padding:0.24rem 0.16rem;
					line-height: 0.32rem;
					color:#fff;
					margin-right: 0.16rem;
					span{
						font-size:0.16rem ;
						}
					}
					
				}
			}
			.ratings-show
			{
				.emptyChecked
				{
					color:#00a0dc;	
				}
				margin:0 0.36rem;
				padding:0.24rem 0rem ;
				border-top: 1px solid rgba(7,17,27,0.1);
				font-size:0.24rem ;
				height: 0.48rem;
				.icon-check_circle{
					font-size:0.48rem ;
					vertical-align: middle;
					margin-right:0.08rem ;
				}

			}
		}
</style>