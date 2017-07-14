<template>
	<div class="shopcount">
			<span class="icon-remove_circle_outline ico" @click.stop="countDec" v-show="food.count"></span>
		<span v-show="food.count">{{food.count}}</span>
		<span  class="icon-add_circle ico" @click.stop="countAdd"></span>
	</div>
</template>	
<script type="text/javascript">
import {mapGetters} from 'vuex'
import Vue from 'vue'
import 'animate.css/animate.css'

export default {
	props:{
		food:{
			type:Object
		}
	},
	computed:{
		copyfood()
		{
			return this.food;
		}
	},
	methods:{
		countAdd(){

			if(!this.food.count)
			{

				Vue.set(this.food,"count",1);

			}
			else
			{
				this.food.count++;
				console.log("ere",this.food.count);
				
			}
			
		},
		countDec(){
			console.log("j",this.food.count);
			if(this.food.count)
			{
				this.food.count--;
			}
		}

		
	}
	}
</script>
<style lang="less" scoped>
	.ico{
			font-size:0.48rem;
			color:rgb(0,160,220);
			vertical-align: middle;
		}
</style>