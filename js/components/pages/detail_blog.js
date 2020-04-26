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
            <div class="container">

    <div class="row">

      <!-- Post Content Column -->
      <div class="col-lg-8" v-if="blog">

        <!-- Title -->
        <h1 class="mt-4">{{ blog.tittle }}</h1>

        <!-- Author -->
        <p class="lead">
          by
          <a href="#">{{ blog.author }}</a>
        </p>

        <hr>

        <!-- Date/Time -->
        <p>Posted on {{ blog.date }}</p>

        <hr>

        <!-- Preview Image -->
        <img class="d-block w-100 rounded" :src="'assets/image/blog/'+ blog.image" alt="Card image cap">

        <hr>

        <!-- Post Content -->
        <p class="lead">{{ blog.content1 }}</p>

        <p class="text-justify">{{ blog.content2 }}</p>

        <hr>

        <img class="d-block w-100 rounded" :src="'assets/image/blog/'+ blog.image2" alt="Card image cap">

        <hr>

        <p class="text-justify">{{ blog.content3}}</p>

        <p class="text-justify">{{ blog.content4}}</p>

        <hr>

      </div>
      <!-- Sidebar Widgets Column -->
      <div class="col-md-4">

        <!-- Search Widget -->
        <div class="card my-4">
          <h5 class="card-header">Search</h5>
          <div class="card-body">
            <div class="input-group" v-for="bg of blogs">
                <div class="view view-cascade overlay">
                    <router-link :to="'/detail_blog/' + bg.id">
                      <img class="d-block w-100 rounded" :src="'assets/image/blog/'+ bg.image">
                                     <router-link :to="'/detail_blog/' + bg.id">
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
                                    <p class="card-text font-weight-bold indigo-text py-2">{{bg.tittle}}</p>
                                </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <!-- /.row -->

  </div>
        </div>
    `
}