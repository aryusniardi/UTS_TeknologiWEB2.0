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
    <div>
        <nav class="navbar z-depth-0 px-5 py-3">
            <div class="container">
                <ul class="nav navbar-nav mx-auto">
                    <li class="nav-item">
                        <a class="h1 text-dark font-weight-bold h-responsive" href="#">
                        <span><img src="../assets/logo.png" height="60vw"/></span> Watch's Store
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="container">
            <nav class="nav nav-pills nav-fill px-5">
                <li :class="[currentPage.includes('home') ? activeClass : 'active', 'nav-item']">
                    <router-link to="/home">
                        <p class="nav-link cool-link p-responsive">Home</p>
                    </router-link>
                </li>
                <li :class="[currentPage.includes('home') ? activeClass : '', 'nav-item']">
                    <router-link to="/brand">
                        <p class="nav-item nav-link cool-link p-responsive">Brand</p>
                    </router-link>
                </li>
                <li :class="[currentPage.includes('home') ? activeClass : '', 'nav-item']">
                    <router-link to="/collection">
                        <p class="nav-item nav-link cool-link p-responsive">Collection</p>
                    </router-link>
                </li>
                <li :class="[currentPage.includes('home') ? activeClass : '', 'nav-item']">
                    <router-link to="/blog">
                        <p class="nav-item nav-link cool-link p-responsive">Blog</p>
                    </router-link>
                </li>
            </nav>
        </div>
    </div>
    `
}