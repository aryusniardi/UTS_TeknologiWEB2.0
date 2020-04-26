var store_blog = new Vuex.Store({
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

export var blog = {
    store_blog,
    computed: {
        blogs(){
            return store_blog.getters.blogs;
        }
    },
    created(){
        store_blog.dispatch('getBlogs').then((response) => {
            console.log('result', response)
        }).catch((error) => {
            console.log('error', error)
        })
    },
        template: `
            <div>
                <section id="gallery">

                <!-- Heading 
                <h2 class="mb-5 font-weight-bold text-center">Gallery heading</h2>
                -->
                <!--Grid row-->
                <div class="row" v-for="blog of blogs">

                    <!--Grid column-->
                    <div class="col-md-6 mb-4">
                    <router-link :to="'/detail_blog/' + blog.id">
                      <img class="d-block w-100 rounded" :src="'assets/image/blog/'+ blog.image">
                      <router-link>
                    </div>
                    <!--Grid column-->

                    <!--Grid column-->
                    <div class="col-md-6">
                        
                        <h4 class="mb-3"><strong>{{blog.tittle}}</strong></h4>
                        
                        <small class="text-muted">{{ blog.author }} / {{ blog.date }}</small>

                        <p class="grey-text text-justify">{{blog.content1}}</p>
                        <!--<a class="btn btn-primary btn-md">Read more</a>-->

                    </div>
                    <!--Grid column-->

                </div>
                <!--Grid row-->

            </section>
            </div>
        `
}