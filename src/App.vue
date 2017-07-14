<template>
  <div id="app">  
    <v-header></v-header>
    <div class="list-tab">
	    <div class="tab-item">
	    	<router-link to="/goods">商品</router-link>
	    </div>
	    <div class="tab-item">
	    	<router-link to="/ratings">评价</router-link>
	    </div>
	    <div class="tab-item">
	    	<router-link to="/sellers">商家</router-link>
	    </div>
    </div>
    <!-- <div class="fixed-title">{{fixedTitle}}</div> -->
    <keep-alive>
    	<router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Vue from 'vue'
import Header from './components/header/Header.vue'
import {mapGetters} from 'vuex'
export default {
	created(){
		this.$store.dispatch('saveMsg');
	},
  components:{
    "v-header":Header
  },
  computed:{
  	...mapGetters(['fixedTitle']),
  	text(){
  		return this.$store.state.text
  	}
  }
}
</script>

<style lang="less" scoped>
	.list-tab
	{
		width:100%;
		height:0.8rem;
		display:flex;
		line-height:0.8rem; 
		justify-content:space-between;
		border-bottom: 1px solid rgba(7,17,27,0.1);
		.tab-item{
			flex:1;
			text-align: center;
			& >a{
			width:100%;	
			height:100%;
			display: block;
			font-size:0.28rem;
			line-height:0.8rem; 
			color:rgb(77,85,93);
			&.active{
				color:rgb(240,20,20);

			}
			

			}
		}
		
	}
	.fixed-title
		{
			padding-left:0.28rem;
			height:0.52rem;
			line-height:0.52rem;
			background:#f3f5f7;
			border-left:0.05rem solid  #d9dde1;
			font-size:0.24rem;
			color:rgb(174,153,159);
			left:1.6rem;
			position: fixed;
			top:3.5rem;
			right: 0rem;
			z-index:3;
		}

</style>
