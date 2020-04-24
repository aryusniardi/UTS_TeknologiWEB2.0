var brand = new Vuex.Store({
    strict: true,
    state: {
        brands: [],
    },
    mutations: {
        setBrands(state, brands) {
            state.brands = brands
        }
    },
    actions: {
        getBrands({
            commit
        }) {
            return new Promise((resolve, reject) => {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", "https://api.jsonbin.io/b/5ea106ff98b3d5375232f596");
                xhr.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        commit('setBrands', JSON.parse(xhr.response))
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
        brands: state => state.brands
    }
})

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
                xhr.open("GET", "https://api.jsonbin.io/b/5ea11d1a1299b937423497b9/1");
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

export var brands = {
    data() {
        return {
            brd: ''
        }
    },
    store,
    brand,
    computed: {
        items() {
            return store.getters.items;
        },
        brands() {
            return brand.getters.brands;
        },
        filterItem() {
            var brd = this.brd;
            console.log(brd)
            let it = this.items.filter(item => {
                return item.brand.toLowerCase() === brd.toLowerCase()
            })

            return it.slice(0, 4)
        }
        
    },
    created() {
        store.dispatch('getItems').then((response) => {
            console.log('result', response)
        }).catch((error) => {
            console.log('error', error)
        });
        brand.dispatch('getBrands').then((response) => {
            console.log('result', response)
        }).catch((error) => {
            console.log('error', error)
        });
    },
    template: `
        <div class="masthead" id="formulir">
            <div class="jumbotron text-center z-depth-0" v-for="brand of brands">
                <img :src="'assets/image/brand/' + brand.image" class="rounded mx-auto d-block card-img-top" alt="brand">
                <p class="text-justify">{{brand.description}}</p>
                <a class="btn-floating bg-dark waves-effect waves-light text-white">
                    <input type="radio" data-toggle="collapse" v-model="brd" :value="brand.brand" :data-target="['#example' + brand.id]" aria-expanded="false" aria-controls="collapseExample"><i class="fas fa-angle-down"></i></input>
                </a>

                <div class="collapse" :id="['example' + brand.id]">
                    <div class="carousel slide carousel-multi-item" data-ride="carousel">
                        <div class="carousel-inner" role="listbox">
                            <div class="carousel-item active">
                                <div v-for="item of filterItem" class="col-md-3 d-flex align-items-stretch" style="float:left">
                                    <div class="card mb-2 z-depth-0">
                                        <div class="view view-cascade overlay">
                                            <img :src="'assets/image/product/' + item.image" class="card-img-top" style="display: cover" alt="">
                                            <router-link :to="'/product/' + item.id">
                                                <div class="mask rgba-white-strong">
                                                    <div class="row d-flex justify-content-center">
                                                        <div class="col-md-6" style="color: #323232">
                                                            <i class="fas fa-search pt-5" style="font-size: 4.5vw !important"></i>
                                                            <h1 class="p-2 h1">Detail</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                            </router-link>
                                        </div>
                                        <div class="card-body">
                                            <h4 class="card-title"><strong>{{item.brand}}</strong></h4>
                                            <p class="card-text font-weight-bold indigo-text py-2">{{item.name}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}