var store_detail_blog = new Vuex.Store({
	strict: true,
    state: {
        blogs:[],
    },
    mutations: {
        setBlogs(state, blogs){
            state.blogs = blogs
        }
    },
    actions: {
        getBlogs({commit}){
            return new Promise((resolve, reject)=> {
                var xhr = new XMLHttpRequest();
                xhr.open("GET","https://api.jsonbin.io/b/5ea4ece21299b93742363388/1");
                xhr.onload = function(){
                    if (this.status >= 200 && this.status < 300) {
                        commit('setBlogs', JSON.parse(xhr.response))
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
        blogs: state => state.blogs
    }
})

export const detail_blog = {
	store_detail_blog,
	props : ['id'],
	computed: {
        blogs() {
            return store_detail_blog.getters.blogs;
        },
        blog() {
            var blog_id = this.id - 1;
            var detail_blog = store_detail_blog.getters.blogs[blog_id];
            return detail_blog
        },
    },
	created(){
		store_detail_blog.dispatch('getBlogs').then((response) => {
           	console.log('result', response)
     	}).catch((error) => {
         	console.log('error', error)
       	})
	},
	template : `
		<div>
        <div class="row">
            <div class="col-md-3">
                <section>
                    <section>
                        <h5 class="pt-2 mb-4 font-weight-bold">Filters</h5>
                        <section class="mb-4">
                            <div class="sidebar-filter">
                                <div class="sidebar-categories">
                                    <div class="head text-white">Categories</div>
                                    <div v-for="bg of blogs">
                                        <router-link :to="'/detail_blog/' + bg.id">
                                            <img class="d-block w-100 rounded" :src="'assets/image/blog/'+ bg.image">
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>
                </section>
            </div>
            
            <div class="col-md-9">
                <section class="text-center mb-4">
                    <div class="row wow fadeIn">
                        <div class="col-lg-4 col-md-6 col-sm-6 mt-4 d-flex align-items-stretch">
                            <div>
                                <div class="view view-cascade overlay">
                                    <div v-if="blog" class="py-4">
                                        {{ blog.tittle}}
                                    </div>    
                                </div>
                                <div class="card-body text-center">
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