window.API_BASE_URL = "http://atm.jairamantransport.com/api/bank/";

//window.API_BASE_URL = "http://localhost:53721/api/bank/";

angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $state) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.logout = function () {
      localStorage.setItem('bankid', '');
      localStorage.setItem('username', '');
      localStorage.setItem('password', '');
      $state.go('login', {}, { reload: true });
    }

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };
  })

  .controller('PlaylistsCtrl', function ($scope) {
    $scope.playlists = [
      { title: 'Reggae', id: 1 },
      { title: 'Chill', id: 2 },
      { title: 'Dubstep', id: 3 },
      { title: 'Indie', id: 4 },
      { title: 'Rap', id: 5 },
      { title: 'Cowbell', id: 6 }
    ];
  })

  .controller('LoginCtrl', function ($rootScope, $scope, $state, $stateParams, HttpRequest) {
    var _hr = HttpRequest;
    var url = API_BASE_URL + 'getbanklistselect';
    // Form data for the login modal
    $scope.loginData = {};
    $scope.bankdetails = {};

    _hr.GetHttpRequest(url).then(function (res) {
      if (res.status == 200) {
        $scope.bankList = res.data;
      }
    });

    $scope.doLogin = function (data, bankname) {
      // loginData
      var url = API_BASE_URL + "userlogin";

      _hr.PostHttpRequest(url, data).then(function (res) {
        if (res.status == 200) {
          localStorage.setItem('bankid', bankname.bankid)
          localStorage.setItem('username', data.username)
          localStorage.setItem('password', data.password)
          $state.go('app.dashboard');
        }
      })
    };

  })

  .controller('DashboardCtrl', function ($scope, $stateParams, HttpRequest, $state, $rootScope) {
    var _hr = HttpRequest;
    url = API_BASE_URL + "getsinglebank?bankid=" + localStorage.bankid;
    _hr.GetHttpRequest(url).then(function (res) {
      if (res.status == 200) {
        $scope.bankDetails = res.data[0];
      }
    });

    $scope.gotodeposit = function () {
      $state.go('app.deposit');
    };

    $scope.gotowithdraw = function () {
      $state.go('app.withdraw');
    };

    $scope.gotolist = function () {
      $state.go('app.transaction');
    };

    $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
      if (toState.url == "/dashboard") {
        _hr.GetHttpRequest(url).then(function (res) {
          if (res.status == 200) {
            $scope.bankDetails = res.data[0];
          }
        });
      }
    });

  })

  .controller('DepositCtrl', function ($rootScope, $scope, $state, $stateParams, HttpRequest) {
    var _hr = HttpRequest;
    url = API_BASE_URL + "getsinglebank?bankid=" + localStorage.bankid;
    _hr.GetHttpRequest(url).then(function (res) {
      if (res.status == 200) {
        $scope.bankDetails = res.data[0];
      }
    });

    $scope.withdrawData = {};

    $scope.doDeposit = function (data) {

      data.mode = "deposite";
      data.bankid = localStorage.bankid;

      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!

      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      var today = dd + '/' + mm + '/' + yyyy;
      //document.getElementById("DATE").value = today;

      data.transactiondate = today;

      console.log(data)


      // loginData
      var url = API_BASE_URL + "banktransaction";

      _hr.PostHttpRequest(url, data).then(function (res) {
        if (res.status == 200) {
          alert("Deposit successfully .... ");
          $state.go('app.dashboard');
        }
      })
    };
  })
  .controller('WithdrawCtrl', function ($rootScope, $scope, $state, $stateParams, HttpRequest) {
    var _hr = HttpRequest;
    url = API_BASE_URL + "getsinglebank?bankid=" + localStorage.bankid;
    _hr.GetHttpRequest(url).then(function (res) {
      if (res.status == 200) {
        $scope.bankDetails = res.data[0];
      }
    });

    $scope.withdrawData = {};

    $scope.doWithdraw = function (data) {

      data.mode = "withdraw";
      data.bankid = localStorage.bankid;

      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!

      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      var today = dd + '/' + mm + '/' + yyyy;
      //document.getElementById("DATE").value = today;

      data.transactiondate = today;


      // loginData
      var url = API_BASE_URL + "banktransaction";

      _hr.PostHttpRequest(url, data).then(function (res) {
        if (res.status == 200) {
          alert("Withdraw successfully .... ");
          $state.go('app.dashboard');
        }
      })
    };
  })

  .controller('TransactionCtrl', function ($rootScope, $scope, $state, $stateParams, HttpRequest) {
    var _hr = HttpRequest;
    url = API_BASE_URL + "getbanktransaction?bankid=" + localStorage.bankid;
    _hr.GetHttpRequest(url).then(function (res) {
      if (res.status == 200) {
        $scope.transactionDetails = res.data;
      }
    });

  })

  .controller('ChangepasswordCtrl', function ($rootScope, $scope, $state, $stateParams, HttpRequest) {

    $scope.changePass = function (data) {

      if (localStorage.password == data.oldpass) {

        var _hr = HttpRequest;
        url = API_BASE_URL + "changepassword?oldpassword=" + data.oldpass + "&newpassword=" + data.newpass + "&username=" + localStorage.username;
        _hr.GetHttpRequest(url).then(function (res) {
          if (res.status == 200) {
            alert(res.data);
            $state.go('login', {}, { reload: true });
          }
        });

      } else {
        alert("Old Password worng...")
      }


    };

  });


