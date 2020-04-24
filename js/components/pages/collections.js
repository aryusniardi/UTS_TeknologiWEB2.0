var category = new Vuex.Store({
    strict: true,
    state: {
        categories: [],
    },
    mutations: {
        setCategories(state, categories) {
            state.categories = categories
        }
    },
    actions: {
        getCategories({
            commit
        }) {
            return new Promise((resolve, reject) => {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", "https://api.jsonbin.io/b/5ea111de1299b937423493ee");
                xhr.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        commit('setCategories', JSON.parse(xhr.response))
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
        categories: state => state.categories
    }
})

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

var store = new Vuex.Store( {
    strict: true,
    state: {
        items:[],
    },
    mutations: {
        setItems(state, items) {
            state.items = items
        }
    },
    actions: {
        getItems({commit}) {
            return new Promise((resolve, reject) => {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", "https://api.jsonbin.io/b/5ea11d1a1299b937423497b9");
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

export var collection = {
    store,
    category,
    brand,
    data() {
        return {
            keyword: '',
            ctg: '',
            select: ''
        }
    },
    computed: {
        items() {
            return store.getters.items;
        },
        brands() {
            return brand.getters.brands;
        },
        categories() {
            return category.getters.categories;
        },
        filteredItems() {
            var currentItems = [];
            var cat = this.ctg; // Category
            var select = this.select; // Brands
            
            return this.items.filter(item => {
                return item.name.toLowerCase().includes(this.keyword.toLowerCase())
            })
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
        category.dispatch('getCategories').then((response) => {
            console.log('result', response)
        }).catch((error) => {
            console.log('error', error)
        });
    },
    template: `
    <div>
        <div class="row">
            <div class="col-md-3">
                <section>
                    <section>
                        <h5 class="pt-2 mb-4 font-weight-bold">Filters</h5>
                        <section class="mb-4">
                            <div class="md-form md-outline mt-0 d-flex justify-content-between align-items-center">
                                <input type="text" id="search12" class="form-control mb-0" placeholder="Search" v-model="keyword">
                                <p class="px-3 pt-3 z-depth-0"><i class="fas fa-search fa-lg"></i></p>
                            </div>
                            <div class="sidebar-filter">
                                <div class="sidebar-categories">
                                    <div class="head text-white">Categories</div>
                                    <ul class="main-categories pt-4 z-depth-0">
                                        <li v-for="category of categories" class="main-nav-list custom-control custom-radio">
                                            <input type="radio" class="custom-control-input" v-bind:id="category.category" name="example1" :value="category.category" v-model="ctg">
                                            <label class="custom-control-label" :for="category.category">{{category.category}}</label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="sidebar-filter">
                                <div class="sidebar-categories">
                                    <div class="head text-white">Brands</div>
                                    <ul class="main-categories pt-4 z-depth-0">
                                        <li v-for="brand of brands" class="main-nav-list custom-control custom-radio">
                                            <input type="radio" class="custom-control-input" :id="brand.brand" name="example2" :value="brand.brand" v-model="select">
                                            <label class="custom-control-label" :for="brand.brand">{{brand.brand}}</label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </section>
                </section>
            </div>
            
            <div class="col-md-9">
                <section class="text-center mb-4">
                    <div class="row wow fadeIn">
                        <div v-for="item of filteredItems" class="col-lg-4 col-md-6 col-sm-6 mt-4 d-flex align-items-stretch">
                            <div>
                                <div class="view view-cascade overlay">
                                    <img :src="'assets/image/product/' + item.image" class="card-img-top" style="display: cover" alt="">
                                    <router-link :to="'/product/' + item.id">
                                        <div class="mask rgba-white-strong">
                                            <div class="row d-flex justify-content-center">
                                                <div class="col-md-6" style="color: #323232">
                                                    <i class="fas fa-search pt-5" style="font-size: 4.5vw !important"></i>
                                                    <h1 class="p-2 h-responsive">Detail</h1>
                                                </div>
                                            </div>
                                        </div>
                                    </router-link>
                                </div>
                                <div class="card-body text-center">
                                    <h4 class="card-title"><strong>{{item.brand}}</strong></h4>
                                    <p class="card-text font-weight-bold indigo-text py-2">{{item.name}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>

    `
}