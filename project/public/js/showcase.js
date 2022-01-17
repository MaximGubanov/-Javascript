Vue.component('showcase',
    {
        template: `
            <div class="goods-list">
                <card v-for="item of list" v-bind:good="item"></card>
            </div>
        `,
        props: ['list']
    })