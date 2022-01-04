Vue.component('basket',
{
    template: `
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
    `,
    props: ['list']
})