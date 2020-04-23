export var collection = {
    data() {
        return {
            keyword: '',
            items: [{

                    id: 1,
                    image: "satu.jpg",
                    name: "SL Andridge Shoes",
                    description: `There are icons and then there are icons. The adidas SL was the first shoe ever to sport the Trefoil. Created in 1972 for the Munich games, it was made for speed and traction. These SL Andridge Shoes bring fresh style to the retro runners with a multicolour Trefoil pattern on the jacquard upper. A comfortable terry lining stays true to vintage inspiration.`,
                    price: "Rp. 2.000.000"
                },
                {
                    id: 2,
                    image: "dua.jpg",
                    name: "NMD R1 Shoes",
                    description: `The best of the past, meet the best of the present. NMD digs into the archives and introduces retro lines to modern materials and techs. These adidas NMD shoes showcase a modern camouflage design on the knit upper and midsole. Outrageously comfy cushioning makes them a go-to for urban commutes.`,
                    price: "Rp. 2.200.000"
                },
                {
                    id: 3,
                    image: "tiga.jpg",
                    name: "Alphaboost IWD Shoes",
                    description: `Join the movement. Celebrate yourself. Aim higher. These adidas running shoes celebrate International Women's Day. They offer a responsive midsole and stability pods on the outsole that support quick turns and accelerations. The sock-like fit gives you a secure feel for high-intensity training.`,
                    price: "Rp. 2.200.000"
                },
                {
                    id: 4,
                    image: "empat.jpg",
                    name: "Ultraboost 20 Shoes",
                    description: `Always one step ahead of the curve. Since the release of the Ultraboost in 2015, the world of running shoes has never been the same. These adidas shoes refine the legendary fit and feel of Ultraboost. The foot-hugging knit upper has stitched-in reinforcement for a locked-in fit. Responsive cushioning adds energy to your stride for that I-could-run-forever feeling. Good for the oceans Primeblue features Parley Ocean PlasticÂ® which is made from recycled waste that's intercepted from beaches and coastal communities before it reaches the ocean.`,
                    price: "Rp. 3.000.000"
                }
            ],
        }
    },
    computed: {
        filteredItems() {
            return this.items.filter(item => {
                return item.name.toLowerCase().includes(this.keyword.toLowerCase())
            })
        }
    },
    template: `
    <div>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark mt-3 mb-5">
                    <span class="navbar-brand">Categories:</span>

                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav" aria-controls="basicExampleNav"
                    aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    
                    <div class="collapse navbar-collapse" id="basicExampleNav">

                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">All
                                <span class="sr-only">(current)</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Category</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Category</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Category</a>
                        </li>

                    </ul>
                    <form class="form-inline">
                        <div class="md-form my-0 text-white">
                            <i class="fas fa-search p"></i>
                            <input class="form-control mr-sm-2" type="text" v-model="keyword" placeholder="Search" aria-label="Search">
                        </div>
                    </form>
                </div>
            </nav>

            <section class="text-center mb-4">
                <div class="row wow fadeIn">
                    <div v-for="item of filteredItems" :key="item.name" class="col-lg-3 col-md-6 col-sm-6">
                        <div class="card">
                            <!--Card image-->
                            <div class="view overlay">
                                <img :src="'img/items/' + item.image" class="card-img-top" alt="">
                                <router-link :to="'/item/' + item.id">
                                    <div class="mask rgba-black-slight"></div>
                                </router-link>
                            </div>
                            <!--Card image-->
                            <!--Card content-->
                            <div class="card-body text-center">
                                <!--Category & Title-->
                                <a href="" class="grey-text">
                                    <h5>#</h5>
                                </a>
                                <h5>
                                <strong>
                                    <a href="" class="dark-grey-text">{{item.name}}</a>
                                </strong>
                                </h5>
                                <h4 class="font-weight-bold blue-text">
                                    <strong>{{item.price}}</strong>
                                </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <nav class="d-flex justify-content-center wow fadeIn">
                    <ul class="pagination pg-dark">
                        <li class="page-item disabled">
                            <a class="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                            </a>
                        </li>

                        <li class="page-item active">
                            <a class="page-link" href="#">1
                                <span class="sr-only">(current)</span>
                            </a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="#">2</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="#">3</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="#">4</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="#">5</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span class="sr-only">Next</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </main>
    </div>

    `
}