<template>
  <div class="alert_container">
    <section class="tip_text_container">
      <div class="tip_icon">
        <span></span>
        <span></span>
      </div>
      <p class="tip_text">{{alertText}}</p>
      <div class="confirm" @click="closeTip">确认</div>
    </section>
  </div>
</template>


<script>
export default {
  name:'alertTip',
  props:['alertText'],
  methods:{
    closeTip(){
      this.$emit('closeTip');
    }
  }
}
</script>


<style lang="scss" scoped>
@import '../../style/mixin';

@keyframes tipMove {
  0% {transform:scale(1)}
  35% {transform:scale(.8)}
  70% {transform:scale(1.1)}
  100% {transform:scale(1)}
}
.alert_container{
  z-index:200;
  position: fixed;
  top:0;
  right: 0;
  bottom:0;
  left: 0;
}
.tip_text_container{
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  position: absolute;
  top:50%;
  left:50%;
  width:12rem;
  margin-left:-6rem;
  margin-top:-6rem;
  padding-top:.8rem;
  border:1px;
  border-radius:.25rem;
  background-color:rgba(255,255,255,1);
  animation:tipMove .4s;
  .tip_icon{
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
    border:.15rem solid #f8cb86;
    border-radius: 50%;
    @include wh(3rem,3rem);
    span:nth-of-type(1){
      background-color:#f8cb86;
      @include wh(.12rem,1.5rem);
    }
    span:nth-of-type(2){
      margin-top:.2rem;
      border:1px;
      border-radius: 50%;
      background-color:#f8cb86;
      @include wh(.2rem,.2rem);
    }
  }
  .tip_text{
    margin-top:.8rem;
    @include sc(.7rem,#333);
  }
  .confirm{
    margin-top:.8rem;
    width:100%;
    line-height:1.8rem;
    font-weight:bold;
    text-align:center;
    border-bottom-left-radius: .25rem;
    border-bottom-right-radius: .25rem;
    background-color:#4cd964;
    @include sc(.8rem,#fff);
  }
}
</style>
