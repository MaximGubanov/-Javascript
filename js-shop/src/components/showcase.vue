<template>
    <div class="goods-list">
        <card v-for="item of list" v-bind:good="item.id"></card>
    </div>
</template>


<script>

import card from '../components/card.vue'

export default {
    name: 'showcase',
    props: ['list'],
    components: {
        card,
    },
    methods: {
        onAdd(id) {
            this.$emit('addToCartId', id)
        }
    }
}
</script>


<style lang="scss" scoped>
    .goods-list {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }

    .goods-item {
        flex: 0 0 22%;
        min-width: 240px;
        height: 350px;
        border: 1px solid rgb(216, 207, 191);
        border-radius: 4px;
        background-color: rgb(255, 239, 206);
        margin: 10px 5px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .goods-item:hover {box-shadow: 0px 0px 15px #bebab1;}

    .add-button {
        font-weight: 400; 
        color: gray;
    }

    .add-button:hover {
        color: rgb(98, 98, 98); 
        font-weight: 500;
    }
</style>