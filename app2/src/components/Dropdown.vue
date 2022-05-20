<template>
  <div class="menu-item" @click="isOpen = !isOpen">
    <a href="#">
      {{ title }}
    </a>
    
    <transition name="fade" appear>
      <div class="sub-menu" v-if="isOpen">
        <div v-for="(item, i) in items" :key="i" class="menu-item">
          <a :href="item.link">{{ item.title }}</a>
        </div>
      </div>
    </transition>
  </div>
    
</template>

<script>
export default {
    name: 'dropdown',
    props: ['title', 'items'],
    data() {
       return {
        isOpen: false
        }
    }
}

</script>


<style>

</style>