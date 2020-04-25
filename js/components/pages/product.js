var store = new Vuex.Store({
    strict: true,
    state: {
        items: [],
    },
    mutations: {
        setItems(state, items) {
            state.items = items
        }
    },
    actions: {
        getItems({
            commit
        }) {
            return new Promise((resolve, reject) => {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", "https://api.jsonbin.io/b/5ea11d1a1299b937423497b9/2");
                xhr.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        commit('setItems', JSON.parse(xhr.response))
                        resolve(xhr.response)
                    } else {
                        reject({
                            status: this.status,
                            statusText: xhr.statusText
                        });
                    }
                };
                xhr.onerror = function () {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    })
                };
                xhr.send()
            })
        }
    },
    getters: {
        items: state => state.items
    }
})

export const product = {
    store,
    props: ['id'],
    computed: {
        item() {
            var prod_id = this.id - 1;
            console.log(prod_id)

            let product = store.getters.items[prod_id];
            return product
        },
        total() {
            return this.item.filter(item => {
                return item.price
            })
        }
    },
    methods: {
        
    },
    created() {
        store.dispatch('getItems').then((response) => {
            // console.log('result', response)
        }).catch((error) => {
            console.log('error', error)
        });
        
    },
    template: `
    <div v-if="item" class="py-4">
        <div class="row wow fadeIn h-75">
            <div class="col-md-6 mb-4 my-auto">
                <div class="card z-depth-0">
                    <img :src="'assets/image/product/' + item.image" class="img-fluid card-img-top" style="height: 70vh"alt="">
                </div>
            </div>

            <div class="col-md-6 mb-4 my-auto p-4">
                <div class="p-4 mx-4 px-4">
                    <h1 class="font-weight-bold h-1 py-3">{{item.name}}
                        <p class="px-4 text-justify h6">{{item.brand}}, {{item.category}}</p>
                    </h1>
                    <h3 class="px-4 main-color font-weight-bold">{{item.price}}</h3>
                    <h4 class="px-4 mt-4 font-weight-bold">Description</h4>
                    <p class="px-4 text-justify">{{item.description}}</p>
                    <button type="button" class="px-4 mt-4 btn btn-dark w-100 font-weight-bold" data-toggle="modal" data-target="#exampleModalCenter">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>

        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title font-weight-bold" id="exampleModalLongTitle">Pembayaran</h1>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <table class="table table-borderless">
                            <tbody>
                                <tr>
                                    <td>Nama </td>
                                    <td>{{item.name}}</td>
                                </tr>
                                <tr>
                                    <td>Brand</td>
                                    <td>{{item.brand}}</td>
                                </tr>
                                <tr>
                                    <td>Category</td>
                                    <td>{{item.category}}</td>
                                </tr>
                                <tr>
                                    <td>Price</td>
                                    <td>{{
                                        item.price
                                    }}</td>
                                </tr>
                                <tr>
                                    <td>Quantity</td>
                                    <td>1</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-dark w-100 mx-4" data-dismiss="modal" aria-label="Close">Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    
}