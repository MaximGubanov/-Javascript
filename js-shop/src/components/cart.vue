<template>
            <table class="cart-list">
            <caption>Корзина</caption>
            <thead>
                <tr>
                    <th>№</th>
                    <th>Название</th>
                    <th>Цена</th>
                    <th>Кол-во</th>
                    <th></th>
                </tr>
            </thead>
            <tbody class="cart-body">
                <basket-list v-for="item of list" v-bind:good="item"></basket-list>
            </tbody>
            <tfoot>
                <tr>
                    <td>Итого:</td>
                </tr>
            </tfoot>
        </table>
</template>

<script>

import card from '../components/card.vue'

export default {
    name: 'basket',
    components: {
        card,
    },
    props: ['good'],
    methods: {
        onclick() {
            this.$emit('cart-close')
        },
        onRemove(id) {
            this.$emit('remove-format', id)
        }
    }
}
</script>

<style lang="scss" scoped>
.cart {
    position: relative;
}

.cart span {
    font-size: 14px;
    color:  rgb(53, 53, 53);
    font-weight: 700;
    position: absolute;
    z-index: 50;
    top: 20%;
    left: 48%;
}

.cart-box {
    display: none;
    position: absolute;
    top: 54px;
    right: 0;
    z-index: 10;
    background: rgb(255, 255, 255);
    border: 1px solid rgb(155, 155, 155);
    border-radius: 4px;
    width: 400px;
    padding: 10px;
}

.cart-list {
    text-transform: capitalize;
    color:rgb(114, 114, 114); 
    font-size: 14px;
    line-height: 24px;
    width: 100%;
}
.cart-list a {
    color:rgb(114, 114, 114); 
    font-size: 14px;
    line-height: 24px;
}

</style>