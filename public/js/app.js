const app = angular.module('TravelsApp', []);

app.controller('MainController', ['$http', function ($http) {


    // ========================================
    // LOGIN LOGIC
    // ========================================

    this.error = null;
    this.user = {};
    this.location = {};

    // auth functions
    this.registerUser = () => {
        console.log('working');
        $http({ url: '/users', method: 'post', data: this.newUserForm })
            .then(response => {
                console.log('We have success!');
                this.user = response.data;
            }, ex => {
                console.log(ex.data.err);
                this.error = ex.statusText;
            })
            .catch(err => this.error = 'Server working?');
    };

    this.loginUser = () => {
        $http({ url: '/sessions/login', method: 'post', data: this.loginForm })
            .then(response => {
                console.log('Log in successful!');
                console.log(respose.data);
                this.user = response.data.user;
                // this.location = response.data;
            }, ex => {
                console.log(ex.data.err);
                this.error = ex.statusText;
            })
            .catch(err => this.error = 'Server broke?');
    };

    this.logout = () => {
        $http({ url: '/sessions/logout', method: 'delete' })
            .then((response) => {
                console.log(response.data);
                this.user = null;
            });
    };



    //-----------------CRUD ROUTES below --------------
    //------------------------------------------------


    this.travel = '';
    this.travels = [];

    this.createForm = {};

    this.createTravel = () => {
        $http({
            method: 'POST',
            url: '/travels',
            data: this.createForm
        }).then(response => {
            this.travels.push(response.data);
            this.createForm = {};
        }, error => {
            console.error(error.message);
        }).catch(err => console.error('Catch: ', err));
    }

    this.getTravels = () => {
        $http({
            method: 'GET',
            url: '/travels'
        }).then(response => {
            this.travels = response.data;
            this.travel = this.travels[0];
        }, error => {
            console.error(error.message);
        }).catch(err => console.error('Catch: ', err));
    }

    //load immediately on page load
    this.getTravels();


    this.deleteTravel = (id) => {
        $http({
            method: 'DELETE',
            url: '/travels/' + id
        }).then(response => {
            const removeByIndex = this.travels.findIndex(travel => travel._id === id)
            this.travels.splice(removeByIndex, 1);
        }
            , error => {
                console.error(error.message);
            }).catch(err => console.error('Catch: ', err));
    }

/////------------edit below------------------------------

    // Update travel
    this.showEdit = (travel) => {
        this.editModal = true;
        this.currentTravelEdit = angular.copy(travel)
    }

    this.editTravel = () => {
        //console.log('edit submit...', this.currentTravelEdit);
        $http({
            method: 'PUT',
            url: '/travels/' + this.currentTravelEdit._id,
            data: this.currentTravelEdit
        }).then(response => {
            console.log('data:', response.data);
            const updateByIndex = this.travels.findIndex(travel => travel._id === response.data._id)
            console.log('update ind:', updateByIndex);
            this.travels.splice(updateByIndex, 1, response.data)
        }).catch(err => console.error('Catch', err));
        this.editModal = false;
        this.currentTravelEdit = {};
    };

    this.dontUpdate = () => {
        this.editModal = false;
        this.currentTravelEdit = {};
    }
/////------end of editting--------------------------------


/////---------------choose travel info---------------------
    this.chooseOneTravel = (travel) => {
        this.travel = travel;
        this.editData = travel;
        // console.log(this.travel.destination);
    }

/////---------------Add travel-----------------------------
    this.addTravel = (travel) => {

        $http({
            method: 'PUT',
            url: '/travels/' + travel._id,
            data: { likes: travel.likes }
        }).then(response => {
            console.log(response.data.likes);
        }, error => {
            console.error(error.message);
        }).catch(err => console.error('Catch: ', err));
    }


    // ========================================
    // LOGIN LOGIC
    // ========================================

    this.error = null;
    this.user = { username: " "};
    // this.location = {};


    // auth functions
    this.registerUser = () => {
        console.log('working');
        $http({ url: '/users', method: 'post', data: this.newUserForm })
            .then(response => {
                console.log(response.data)
                console.log('We have success!');
                this.user = response.data;
            }, ex => {
                console.log(ex.data.err);
                this.error = ex.statusText;
            })
            .catch(err => this.error = 'Server working?');
    };

    this.loginUser = () => {
        $http({ url: '/sessions/login', method: 'post', data: this.loginForm })
            .then(response => {

                // console.log(respose.data.username);
                console.log('Log in successful!');
                console.log(respose.data);
                this.user = response.data.user;
                // this.location = response.data;
            }, ex => {
                console.log(ex.data.err);
                this.error = ex.statusText;
            })
            .catch(err => this.error = 'Server broke?');
    };

    this.logout = () => {
        $http({ url: '/sessions/logout', method: 'delete' })
            .then((response) => {
                console.log(response.data);
                this.user = null;
            });
    };

    //------------Modal---open/close-----------------
        this.showLoginModal = () => {
            console.log('opening model');
            this.modelOpenLogin = true;
            // this.modelOpen = false;
        }

        this.closeLoginModal = () => {
            console.log('opening model');
            this.modelOpenLogin = false;

        }

//-------------end--side nav----------------


}]);

//////////// WHATS UP ////////////////////////
