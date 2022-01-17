<template>
  <div id="nav">
    {{ showcase }}
  </div>
  <router-view/>
</template>


<script>
export default {
  data() {
    return {showcase: null}
  },
  mounted() {
    fetch('api/v1/showcase')
      .then(res => res.json())
      .then(data => {
        this.showcase = data
      })
    }
}
</script>


<style lang="scss">

</style>
