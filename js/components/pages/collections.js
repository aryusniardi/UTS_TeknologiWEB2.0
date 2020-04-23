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
    data() {
        return {
            keyword: '',
        }
    },
    computed: {
        items() {
            return store.getters.items;
        },
        filteredItems() {
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
        })
    },
    template: `
    <div>
        <div class="row">
            <div class="col-md-4">
                <section>
                    <section>
                        <h5 class="pt-2 mb-4">Filters</h5>
                        <section class="mb-4">
                            <div class="md-form md-outline mt-0 d-flex justify-content-between align-items-center">
                                <input type="text" id="search12" class="form-control mb-0" placeholder="Search" v-model="keyword">
                            </div>
                        </section>

                        <section class="mb-4">
                            <h6 class="font-weight-bold mb-3">Brands</h6>
                            <div class="form-check pl-0 mb-3">
                                <input type="checkbox" class="form-check-input filled-in" id="new">
                                <label class="form-check-label small text-uppercase card-link-secondary" for="new">Brand 1</label>
                            </div>
                                <div class="form-check pl-0 mb-3">
                                <input type="checkbox" class="form-check-input filled-in" id="used">
                                <label class="form-check-label small text-uppercase card-link-secondary" for="used">Brand 2</label>
                            </div>
                                <div class="form-check pl-0 mb-3">
                                <input type="checkbox" class="form-check-input filled-in" id="collectible">
                                <label class="form-check-label small text-uppercase card-link-secondary" for="collectible">Brand 3</label>
                            </div>
                                <div class="form-check pl-0 mb-3 pb-1">
                                <input type="checkbox" class="form-check-input filled-in" id="renewed">
                                <label class="form-check-label small text-uppercase card-link-secondary" for="renewed">Brand 4</label>
                            </div>
                        </section>
                    </section>
                </section>
            </div>
            
            <div class="col-md-8">
                <section class="text-center mb-4">
                    <div class="row wow fadeIn">
                        <div v-for="item of filteredItems" class="col-lg-4 col-md-6 col-sm-6 mt-4 d-flex align-items-stretch">
                            <div>
                                <div class="view view-cascade overlay">
                                    <img :src="'assets/image/product/' + item.image" class="card-img-top" style="display: cover" alt="">
                                    <div class="mask rgba-white-strong">
                                        <div class="row d-flex justify-content-center">
                                            <div class="col-md-6" style="color: #323232">
                                                <i class="fas fa-search pt-5" style="font-size: 4.5vw !important"></i>
                                                <h1 class="p-2 h-responsive">Detail</h1>
                                            </div>
                                        </div>
                                    </div>
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