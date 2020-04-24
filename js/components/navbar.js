export var navbar = {
    computed: {
        currentPage() {
            return this.$route.path;
        }
    },
    data() {
        return {
            activeClass: 'active',
        };
    },
    template: `
    <nav class="navbar navbar-expand-md navbar-light navbar-transparent px-3 py-4 z-depth-0">
        <div class="container-fluid">
            <router-link to="/">
                <p class="h1 text-dark font-weight-bold h-responsive">
                    <span><img src="../assets/logo.png" height="40vw"/></span> 
                    Watch's Store
                </p>
            </router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
        <div class="collapse navbar-collapse" id="mainNav">
            <ul class="navbar-nav ml-auto">
                <li :class="[currentPage.includes('home') ? activeClass : 'nav-item .active', 'nav-item']">
                    <router-link to="/home">
                        <p class="nav-link waves-effect p-responsive cool-link text-center">
                            Home
                        </p>
                    </router-link>
                </li>
                <li :class="[currentPage.includes('brand') ? activeClass : 'nav-item .active', 'nav-item']">
                    <router-link to="/brand">
                        <p class="nav-link waves-effect p-responsive cool-link text-center">
                            Brand
                        </p>
                    </router-link>
                </li>
                <li :class="[currentPage.includes('collection') ? activeClass : 'nav-item .active', 'nav-item']">
                    <router-link to="/collection">
                        <p class="nav-link waves-effect p-responsive cool-link text-center">
                            Collection
                        </p>
                    </router-link>
                </li>
                <li :class="[currentPage.includes('home') ? activeClass : 'nav-item .active', 'nav-item']">
                    <router-link to="/blog">
                        <p class="nav-link waves-effect p-responsive cool-link text-center">
                            blog
                        </p>
                    </router-link>
                </li>
            </ul>
            </div>
        </div>
    </nav>
    `
}