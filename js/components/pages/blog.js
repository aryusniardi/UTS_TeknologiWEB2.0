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

var colletion = new Vuex.Store( {
    strict: true,
    state: {
        colletions:[],
    },
    mutations: {
        setCollections(state, colletions) {
            state.colletions = colletions
        }
    },
    actions: {
        getCollections({commit}) {
            return new Promise((resolve, reject) => {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", "https://api.jsonbin.io/b/5ea11d1a1299b937423497b9/2");
                xhr.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        commit('setCollections', JSON.parse(xhr.response))
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
        colletions: state => state.colletions
    }
})


export var blog = {
    store_blog,
    colletion,
    computed: {
        blogs(){
            return store_blog.getters.blogs;
        },
        colletions(){
            return colletion.getters.colletions;
        },
        filteredCollections: function(){
            return this.colletions.slice(0,4)
        }
    },
    created(){
        store_blog.dispatch('getBlogs').then((response) => {
            console.log('result', response)
        }).catch((error) => {
            console.log('error', error)
        })

        colletion.dispatch('getCollections').then((response)=>{
            console.log('result', response)
        }).catch((error) => {
            console.log('error', error)
        })
    },
        template: `
            <div>
                <div class="container">

    <div class="row">

      <!-- Blog Entries Column -->
      <div class="col-md-8">

        <h1 class="my-4">WATCHES - 
          <small>News</small>
        </h1>

        <!-- Blog Post -->
        <div class="card mb-4" v-for="blog of blogs">
          <img class="d-block w-100 rounded" :src="'assets/image/blog/'+ blog.image" alt="Card image cap">
          <div class="card-body">
            <h2 class="card-title">{{blog.tittle}}</h2>
            <p class="card-text">{{blog.content1}}</p>
            <router-link :to="'/detail_blog/' + blog.id">
            <a href="#" class="btn btn-elegant btn-block"">Read More &rarr;</a>
            </router-link>
          </div>
          <div class="card-footer text-muted">
            Posted on {{ blog.date }} by {{ blog.author }}
          </div>
        </div>

      </div>
      <div class="col-md-4">
        <div class="card my-4">
          <h5 class="card-header">TOP Watch</h5>
          <div class="card-body">
                <div v-for="colletion of filteredCollections">
                            <div>
                                <div class="view view-cascade overlay">
                                    <img :src="'assets/image/product/' + colletion.image" class="card-img-top" style="display: cover" alt="">
                                    <router-link :to="'/product/' + colletion.id">
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
                                    <h4 class="card-title"><strong>{{colletion.brand}}</strong></h4>
                                    <p class="card-text font-weight-bold indigo-text py-2">{{colletion.name}}</p>
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