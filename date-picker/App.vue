<template>
    <div>
        <!-- :value="now" @input="val => now = val" -->
        <DatePicker v-model="now"></DatePicker>
    </div>
</template>
<script>
import DatePicker from './date-picker';
export default {
    components: {
        DatePicker
    },
    data() {
        return {
            now: new Date()
        }
    }
}
</script>
