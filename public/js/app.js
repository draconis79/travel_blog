const app = angular.module('TravelsApp', []);

app.controller('MainController', ['$http', function ($http) {

    this.createForm = {};

    this.travel = '';

    this.travels = [];


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
        console.log("I'm going to delete you", id);
    }

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

/////----------edit doesnt work------------------------------------

    // Show Edit Form
    this.showEdit = (travel) => {
        this.editData = {};
        this.showForm = travel._id;
    }

    // Edit travel
    this.editTravel = (travel) => {
        console.log("Editing: ", travel._id);
        $http({
            method: "put",
            url: "/travels/" + travel._id,
            data: this.editData
        }).then(response => {
            console.log(this.editData);
            this.loadTravels();
            this.showForm = {};
            console.log("Response: ", response);
        }, error => {
            console.error(error);
        }).catch(err => {
            console.error("Catch: ", err);
        })
    }
/////-------------------------------------------------------------



    this.chooseOneTravel = (travel) => {
        this.travel = travel;
        this.editData = travel;
        // console.log(this.travel.destination);
    }


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



}]);

//////////// WHATS UP ////////////////////////