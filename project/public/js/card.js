Vue.component('card',
    {
        template: `
            <div class="goods-item">
                <img v-bind:src="good.img" alt="">
                <h3>{{ good.title }}</h3>
                <p>Цена: {{ good.price }}</p>
                <p><a href="#" v-bind:id="good.id" class="add-button">Добавить</a></p></p>
            </div>
        `,
        props: ['good']
    })