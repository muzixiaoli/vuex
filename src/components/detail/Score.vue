<template>
	<div class="score">
		<span :class="starItemClass" v-for="starItemClass in starItem" class="star" :style="{width:w,height:h}"></span>
		
	</div>
</template>
<script type="text/javascript">
	
	const Len=5;
	const ON='ON';
	const HALF='HALF';
	const OFF='OFF';
	export default {
		// props:['score','w']
		props:{
			score:null,
			w:null,
			h:null
		},
		computed:{
			starItem(){
			var starItem=[];
			var inter=Math.floor(this.score);
			var dis=this.score-inter;
			for(let i=0;i<inter;i++)
			{
				starItem.push(ON);
			}
			if(dis>0.5)
			{
				starItem.push(HALF);
			}
			while(starItem.length<Len)
			{
				starItem.push(OFF);
			}
			return starItem
		}
	}
			
	}

</script>
<style lang="less" scoped>
	.score
	{
		// display: flex;
		// justify-content: space-between;
		.star
	{
		display:inline-block;
		width:0.48rem;
		height:0.48rem;
		background-size:100% 100%;

		 margin-right:0.1rem; 
		
	}
	}
	
	.ON
	{
		background:url('../../../static/img/star24_on@2x.png') no-repeat;
	}
	.HALF
	{
		background:url('../../../static/img/star24_half@2x.png') no-repeat;	
	}
	.OFF
	{
		background:url('../../../static/img/star24_off@2x.png') no-repeat;	
	}
</style>
