var app = new Vue({
    el:'#app',
    data:{
        errorMsg: "",
        successMsg: "",
        showAddModal: false,
        showEditModal: false,
        showDeleteModal: false,
        users:[],
        newUser: {name:"", email: "", phone: ""},
        currentUser: {}
    },
    mounted: function(){
        this.getAllUsers();
    },
    methods:{
        // Show/Read Data form database
        getAllUsers(){
            axios.get("http://localhost/vue-php/process.php?action=read").then(function(response){
                if(response.data.error){
                    app.errorMsg = response.data.message;
                }else{
                    app.users = response.data.users;
                }
            });
        },
        // Creat/Insert Data to database
        addUser(){
            var formData = app.toFormData(app.newUser);
            axios.post("http://localhost/vue-php/process.php?action=create", formData).then(function(response){
                app.newUser = {name: "", email: "", phone: "", dob: "", ban: "", eng: "", math: "", phy: ""};
                if(response.data.error){
                    app.errorMsg = response.data.message;
                }else{
                    app.successMsg = response.data.message;
                    app.getAllUsers();
                }
            });
        },
        // Update/Edit Data form database
        updateUser(){
            var formData = app.toFormData(app.currentUser);
            axios.post("http://localhost/vue-php/process.php?action=update", formData).then(function(response){
                app.currentUser = {};
                if(response.data.error){
                    app.errorMsg = response.data.message;
                }else{
                    app.successMsg = response.data.message;
                    app.getAllUsers();
                }
            });
        },
        // Delete Data form database
        deleteUser(){
            var formData = app.toFormData(app.currentUser);
            axios.post("http://localhost/vue-php/process.php?action=delete", formData).then(function(response){
                app.currentUser = {};
                if(response.data.error){
                    app.errorMsg = response.data.message;
                }else{
                    app.successMsg = response.data.message;
                    app.getAllUsers();
                }
            });
        },
        toFormData(obj){
            var fd = new FormData();
            for(var i in obj) {
                fd.append(i,obj[i]);
            }
            return fd;
        },
        selectUser(user){
            app.currentUser = user;
        },
        clearMsg(){
            app.errorMsg = "";
            app.successMsg = "";
        }
    }
});  