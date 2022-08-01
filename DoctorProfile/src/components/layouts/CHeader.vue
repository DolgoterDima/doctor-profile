<template>
  <header class="header">
    <h1 class="header__title">{{title}}</h1>

  </header>
</template>
<script>
export default {
  name: 'CHeader',
  props:{
    title:{
      type:String,
      default:'Заголовок'
    }
  }
}
</script>