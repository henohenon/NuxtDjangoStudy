<template>
  <div :class="'actor '+template" :style="'transform:translate('+x*60+'px,'+y*60+'px)'">
    <meter :max ="maxHp" min="0" low="30" high="70" optimum="80" :value ="hp" ></meter>
  </div>
</template>

<script>
  export default {
    props: ['maxHp','hp',"x","y","template"],
  }
</script>

<style lang="scss">
  .actor{
    width: 50px;
	  height: 50px;
    position: absolute;
    text-align: center;
    transition-duration: 0.5s;
    // animation: attack 0.5s ease 0s 1 normal none running;
    meter{
      width: 90%;
      transform: translate(0%,200%);
    }
  }
  .actor.maru{
    border-radius: 50%;
    background: skyblue;
  }
  .actor.sikaku{
    background: palevioletred  
  }
  // todo: なんかさんかくのときだけhpゲージの表示がおかしい
  .actor.sankaku{
    border-right: 50px solid transparent;
    border-bottom: 86.6025px solid #b2ce54;
    border-left: 50px solid transparent; 
    background: none;
  }

  @keyframes attack {
    0% {
      width  : 50px;
	    height : 50px;
    }
    30% {
      width  : 70px;
	    height : 70px;
    }
    100% {
      width: 50px;
	    height: 50px;
    }
}
</style>