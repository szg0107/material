<template>
  <div class="home">
    <SiteAside />
  </div>
</template>

<script>
// @ is an alias to /src
import SiteAside from '@/components/SiteAside/index.vue';

export default {
  name: 'Home',
  components: {
    SiteAside,
  },
};
</script>
