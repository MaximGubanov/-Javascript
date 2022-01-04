Vue.component('basket-list',
{
    template: `
        <tr>
            <td>{{ good.id }}</td><td>{{ good.title }}</td><td>{{ good.price }}</td><td>{{ good.count }}</td><td>
            <a href="" v-bind:id="good.id" class="remove-button">Удалить</a></td>
        </tr>
    `,
    props: ['good']
})