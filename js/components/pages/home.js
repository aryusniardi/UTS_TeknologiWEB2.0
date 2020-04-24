var store_home = new Vuex.Store({
	strict: true,
	state: {
		items:[],
	},
	mutations: {
		setItems(state, items){
			state.items = items
		}
	},
	actions: {
		getItems({commit}){
			return new Promise((resolve, reject)=> {
				var xhr = new XMLHttpRequest();
				xhr.open("GET","https://api.jsonbin.io/b/5ea111de1299b937423493ee");
				xhr.onload = function(){
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

export var home = {
	store_home,
	data(){
		return {
			keyword: '',
		}
	},
	computed: {
		items() {
            return store_home.getters.items;
        }
	},
	created() {
        store_home.dispatch('getItems').then((response) => {
            console.log('result', response)
        }).catch((error) => {
            console.log('error', error)
        })
    },
    template: `
    			<div>
    			<section id="best-features" class="text-center">

                <!-- Heading -->
                <h2 class="mb-5 font-weight-bold">Best Features</h2>

                <!--Grid row-->
                <div class="row d-flex justify-content-center mb-4">

                    <!--Grid column-->
                    <div class="col-md-8">

                        <!-- Description -->
                        <p class="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi voluptate
                            hic
                            provident nulla repellat
                            facere esse molestiae ipsa labore porro minima quam quaerat rem, natus repudiandae debitis
                            est
                            sit pariatur.</p>

                    </div>
                    <!--Grid column-->

                </div>
                <!--Grid row-->

                <!--Grid row-->
                <div class="row"  >
                    <div v-for="item of items" class="col-lg-4 col-md-6 col-sm-6 mt-4 d-flex align-items-stretch">
                    <!--Grid column-->
                    <div class="text-center">
                        <img :src="'assets/image/category/' + item.image" alt="">
                        <h4 class="my-4 font-weight-bold">{{item.category}}</h4>
                        <!--<p class="grey-text">{{item.description}}</p>-->
                    </div>
                    </div>
                </div>
                <!--Grid row-->

            </section>
    			</div>
    `
}