var Tatts;
(function (Tatts) {
    (function (Services) {
        var Racing = (function () {
            function Racing() { 
                this.baseURL = '/svc/sales/vmax/'; 
                console.log('racingService::constructor');
            }
            Racing.prototype.requestRacingService = function (requestParams, callback) { 
                if (requestParams.method == 'formguide')
                    this.requestFormGuide(requestParams, callback); else if (requestParams.method == 'race')
                    this.requestRaceData(requestParams, callback);
            }; 

            Racing.prototype.requestFormGuide = function (params, callbackMethod) {
                var formGuideURL = this.baseURL + 'web/data/racing/formguide/' + params.meetingDate + '/' + params.meetingCode + '/' + params.raceNumber;

                var ajaxRequest = new Tatts.Manager.Ajax();
                ajaxRequest.ajaxRequest({
                    url: formGuideURL,
                    callback: function (data) {
                        data.id = params.id;

                        callbackMethod(data);
                    }
                });
            };

            Racing.prototype.requestRaceData = function (params, callbackMethod) {
                var raceDataURL = this.baseURL + 'web/data/racing/' + params.meetingDate + '/' + params.meetingCode + '/' + params.raceNumber;

                var ajaxRequest = new Tatts.Manager.Ajax();
                ajaxRequest.ajaxRequest({
                    url: raceDataURL,
                    callback: function (data) {
                        data.id = params.id;

                        callbackMethod(data);
                    }
                });
            };

            Racing.getInstance = function () {
                if (this.instance == null) {
                    this.instance = new Tatts.Services.Racing();
                }
                return this.instance;
            };
            Racing.name = 'Tatts.Services.Racing';
            return Racing;
        })();
        Services.Racing = Racing;
    })(Tatts.Services || (Tatts.Services = {}));
    var Services = Tatts.Services;
})(Tatts || (Tatts = {}));
