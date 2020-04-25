var store = new Vuex.Store({
    strict: true,
    state: {
        items: [],
    },
    mutations: {
        setItems(state, items) {
            state.items = items
        },
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
        items: state => state.items,
    }
})

var checkout = new Vuex.Store({
    state: {
        counter: 1,
        firstName: '',
        lastName: '',
        emailAddress: '',
        address: '',
        total: '',
        paymentMethod: [
            {payment: 'Credit Card'},
            {payment: 'Debit Card'},
            {payment: 'Paypal'},
        ],
        payment: ''
    },
    mutations: {
        increment: state=> state.counter++,
        decrease: state=> state.counter--,
        setFirstName(state, firstName) {
            state.firstName = firstName
        },
        setLastName(state, lastName) {
            state.lastName = lastName
        },
        setEmailAddress(state, emailAddress) {
            state.emailAddress = emailAddress
        },
        setAddress(state, address) {
            state.address = address
        },
        setPaymentMethod(state, paymentMethod, payment) {
            state.payment = paymentMethod
        },
        setTotal(state, total) {
            state.total = total
        }
    },
    getters: {
        firstName: state=>state.firstName,
        lastName: state=>state.lastName,
        emailAddress: state=>state.emailAddress,
        address: state=>state.address,
        paymentMethod: state=>state.paymentMethod,
        total: state=>state.total,
        counter: state=>state.counter
    }
})

export const payment = {
    data() {
        return {
            payment:''
        }
    },
    store,
    checkout,
    props: ['id'],
    computed: {
        item() {
            var prod_id = this.id - 1;
            let product = store.getters.items[prod_id];
            return product
        },
        quantity() {
            return checkout.state.counter
        },
        payments() {
            return checkout.getters.paymentMethod
        },
        total() {
            let price = this.item.price
            let quantityItem = this.quantity
            console.log(price)
            console.log(quantityItem)
            return price * quantityItem
        },
        firstName: {
            get() {
                return checkout.getters.firstName
            },
            set(value) {
                checkout.commit('setFirstName', value)
            }
        },
        lastName: {
            get() {
                return checkout.getters.lastName
            },
            set(value) {
                checkout.commit('setLastName', value)
            }
        },
        emailAddress: {
            get() {
                return checkout.getters.emailAddress
            },
            set(value) {
                checkout.commit('setEmailAddress', value)
            }
        },
        address: {
            get() {
                return checkout.getters.address
            }, 
            set(value) {
                checkout.commit('setAddress', value)
            }
        },
        paymentMethod: {
            get() {
                return checkout.getters.paymentMethod
            },
            set(value) {
                checkout.commit('setPaymentMethod', value)
            }
        },
    },
    methods: {
        formatPrice(value) {
            let val = (value / 1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        increment() {
            checkout.commit('increment')
        },
        decrease() {
            checkout.commit('decrease')
        },
        openpopup(){
            alert("Item tidak ada")
            this.$router.push("/")
        }
    },
    created() {
        store.dispatch('getItems').then((response) => {
            // console.log('result', response)
        }).catch((error) => {
            console.log('error', error)
        });
    },
    template: `
    <div class="container wow fadeIn">
        <h2 class=" py-4 h1 font-weight-bold">Checkout form</h2>
        <div class="row py-4 h-75">

            <div class="col-md-7">
                <div class="card">
                    <form class="card-body">
                        <div class="row">
                            <div class="col-md-6 mb-2">
                                <div class="md-form ">
                                    <input type="text" id="firstName" class="form-control" v-model="firstName">
                                    <label for="firstName" class="">First name</label>
                                </div>
                            </div>
                            <div class="col-md-6 mb-2">
                                <div class="md-form">
                                    <input type="text" id="lastName" class="form-control" v-model="lastName">
                                    <label for="lastName" class="">Last name</label>
                                </div>
                            </div>
                        </div>
                        <div class="md-form mb-5">
                            <input type="text" id="email" class="form-control" v-model="emailAddress">
                            <label for="email" class="">Email</label>
                        </div>
                        <div class="md-form mb-5">
                            <input type="text" id="address" class="form-control" v-model="address">
                            <label for="address" class="">Address</label>
                        </div>
                        <div class="d-block my-3">
                            <div class="custom-control custom-radio " v-for="payment of payments">
                                <input type="radio" class="custom-control-input" :id="payment.payment" name="example" :value="payment.payment" v-model="paymentMethod">
                                <label class="custom-control-label" :for="payment.payment">{{payment.payment}}</label>
                            </div>
                        </div>
                        <hr class="mb-4">
                        <button class="btn btn-dark btn-lg btn-block" data-toggle="modal" data-target="#modalInput" type="submit">Continue to checkout</button>
                    </form>
                </div>
            </div>

            <!-- Modal -->
            <div class="modal fade text-dark" id="modalInput" tabindex="-1" role="dialog" aria-labelledby="modalInput"
                aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title h3 font-weight-bold" id="modalInput">Checkout Confirmation</h5>
                            <a type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </a>
                        </div>
                        <div class="modal-body p-4">
                            <div v-if="item">
                                <div class="row wow fadeIn h-75">
                                    <div class="mx-4 px-4">
                                        <label class=""><i class="fas fa-map-marker-alt mx-3"></i> Alamat Pengiriman</label>
                                        <p class="px-4 text-justify font-weight-bold">{{firstName}} {{lastName}} - {{emailAddress}}</p>
                                        <p class="px-4 text-justify font-weight-bold">{{address}}</p>
                                        <div class="card z-depth-0">
                                            <img :src="'assets/image/product/' + item.image" class="card-img-top" style="height: 20vh"alt="">
                                        </div>
                                        <label>Product</label>
                                        <p class="px-4 text-justify font-weight-bold">{{item.name}}</p>
                                        <label>Brand</label>
                                        <p class="px-4 text-justify font-weight-bold">{{item.brand}}</p>
                                        <label>Category</label>
                                        <p class="px-4 text-justify font-weight-bold">{{item.category}}</p>
                                        <label>Quantity</label>
                                        <p class="px-4 text-justify font-weight-bold">{{quantity}}</p>
                                        <label class="pt-2">SubTotal</label>
                                        <p class="px-4 text-justify font-weight-bold h4">Rp.{{formatPrice(total)}}</p>
                                       
                                        <button type="button" class="px-4 mt-4 btn btn-dark w-100 font-weight-bold" @click="openpopup()" data-dismiss="modal" aria-label="Close">
                                            Proceed
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Modal -->

            <div class="col-md-5 mb-4 pt-4">
                <h4 class="d-flex justify-content-between align-items-center mb-3 h1 font-weight-bold">
                    <span class="text-muted">Your cart</span>
                </h4>
                <ul class="list-group mb-3 z-depth-1">
                    <li :if="item" class="list-group-item d-flex justify-content-between lh-condensed pb-4">
                        <tr>
                            <td>
                                <h6 class="my-0 font-weight-bold">{{item.name}}</h6>
                                <small class="text-muted">{{item.category}}, {{item.brand}}</small>
                            </td>
                            <td colspan="2">
                                <div class="md-form input-group px-5 text-white px-3 font-weight-bold">
                                    <button class="btn btn-floating button-for-quantity bg-dark" v-if="quantity > 0" @click="decrease()"><h4 class="h4 font-weight-bold">-</h4></button>
                                    <input class="text-center w-25" :value="quantity" disabled></input>
                                    <button class="btn btn-floating button-for-quantity bg-dark" v-if="quantity < item.stock" @click="increment()"><h4 class="h4 font-weight-bold">+</h4></button>
                                </div>
                            </td>
                            <td>
                                <span class="text-muted">Rp. {{formatPrice(item.price)}}</span>
                            </td>
                        </tr>
                    </li>
                    <li class="list-group-item d-flex justify-content-between font-weight-bold">
                        <span>Total</span>
                        <strong class="font-weight-bold">Rp. {{formatPrice(total)}}</strong>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    `,

}