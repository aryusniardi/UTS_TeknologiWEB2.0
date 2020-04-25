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
                xhr.open("GET", "https://api.jsonbin.io/b/5ea111de1299b937423493ee/1");
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
                xhr.open("GET", "https://api.jsonbin.io/b/5ea106ff98b3d5375232f596/1");
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

export var collection = {
    store,
    category,
    brand,
    data() {
        return {
            keyword: '',
            ctg: '',
            select: '',
            page: 1,
            perPage: 9,
            pages: [],
        }
    },
    methods: {
        onChangePage(pageOfItems) {
            this.pageOfItems = pageOfItems;
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
            var currentItems = store.getters.items;
            var cat = this.ctg; // Category
            var select = this.select; // Brands
            console.log(cat);
            console.log(select)

            if (cat !== '') {
                currentItems = currentItems.filter(item => {
                    return item.category.toLowerCase() === cat.toLowerCase()
                })
            }

            if (select !== '') {
                currentItems = currentItems.filter(item=> {
                    return item.brand.toLowerCase() === select.toLowerCase()
                })
            }

            return currentItems.filter(item => {
                return item.name.toLowerCase().includes(this.keyword.toLowerCase())
            })
        },
        displayedItems() {
            return this.paginate(this.filteredItems)
        }        
    },
    methods: {
        setPages() {
            let numberOfPages = Math.ceil(this.items.length / this.perPage);
            for (let index = 1; index <= numberOfPages; index ++) {
                this.pages.push(index)
            }
        },
        paginate(filteredItems) {
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return filteredItems.slice(from, to);
        },
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
    watch: {
        filteredItems() {
            this.setPages();
        }
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
                        <div v-for="item of displayedItems" class="col-lg-4 col-md-6 col-sm-6 mt-4 d-flex align-items-stretch">
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
                    <nav aria-label="Page navigation example">
                        <ul class="pagination d-flex justify-content-center pg-dark text-center">
                            <li class="page-item ">
                                <a class="page-link" tabindex="-1" v-if="page != 1" @click="page--">Previous</a>
                            </li>
                            <li class="page-item" v-for="pageNumber in pages.slice(page-1, page+5)"><a class="page-link" @click="page = pageNumber">{{pageNumber}}<span class="sr-only">(current)</span></a></li>
                            <li class="page-item ">
                                <a class="page-link" v-if="page < pages.length" @click="page++">Next</a>
                            </li>
                        </ul>
                    </nav>
                </section>
            </div>
        </div>
    </div>

    `
}