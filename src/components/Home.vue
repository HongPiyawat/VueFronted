<template>
    <div>
        <h2 style="text-align: center;">Home</h2>
        <p>Welcome to the Home page!</p>
        <span v-if="message">
            [{{ message }}]
        </span>
    </div>
</template>
  
<script>
    export default {
        data() {
            return {
                message: '',
            };
        },
        mounted() {
            this.message = this.$route.query.message || ''; // รับค่า message จาก route query
        },
    };
</script>
  
<style scoped>
  
</style>
  