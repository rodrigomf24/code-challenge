var service = {
    multiple:{
        doInsert:function(path, params, list, returnList) {
            var _this = this;
            return new Promise(function(resolve, reject) {
                var method = (params.id === void(0)) ? 'POST' : 'PUT';
                service.executeRequest(method, path[method.toLowerCase()], params).then(function(response) {
                    resolve(_this.onInsertResolve(path, list, returnList, response));
                }, function(err) {
                    resolve(_this.onInsertResolve(path, list, returnList, void(0)));
                });
            });
        },
        onInsertResolve:function(path, list, returnList, response) {
            var _this = this;
            return new Promise(function(resolve, reject) {
                list.shift();
                if(typeof(response) === 'object') {
                    returnList = (returnList === void(0)) ? [response] : returnList.concat([response]);
                }
                if(list.length > 0) {
                    resolve(_this.doInsert(path, list[0], list, returnList));
                } else {
                    resolve(returnList);
                }
            });
        }
    },
    get:{
        household:{
            single:function(id) {
                return service.executeRequest('GET', 'household/'+id);
            },
            all:function() {
                return service.executeRequest('GET', 'household');
            }
        },
        persons:function(householdId) {
            return service.executeRequest('GET', 'person/'+householdId);
        },
        vehicles:function(householdId) {
            return service.executeRequest('GET', 'vehicle/'+householdId);
        }
    },
    upsert:{
        persons:function(list, householdId) {
            return service.multiple.doInsert({post:'person/'+householdId, put:'person'}, list[0], list);
        },
        vehicles:function(list, householdId) {
            return service.multiple.doInsert({post:'vehicle/'+householdId, put:'vehicle'}, list[0], list);
        }
    },
    post:{
        household:function(params) {
            return service.executeRequest('POST', 'household', params);
        }
    },
    put:{
        household:function(params) {
            return service.executeRequest('PUT', 'household', params);
        }
    },
    delete:{
        household:function(params) {
            
        },
        persons:function(params, householdId) {
            
        },
        vehicles:function(params, householdId) {
            
        }
    },
    executeRequest:function(method, path, params) {
        return new Promise(function(resolve, reject) {
            var ajaxSettings = {
                url:GlobalSettings.api+path,
                dataType:'json',
                cache:false,
                method:method,
                success:function(data) {
                    resolve(data);
                }.bind(resolve),
                error:function(xhr, status, err){
                    reject({error:'ERROR: '+status+'\n'+err.toString()});
                }.bind(reject)
            };
            
            if(['post', 'put'].indexOf(method.toLowerCase()) !== -1) {
                ajaxSettings.data = params;
            }
            
            $.ajax(ajaxSettings);
        });
    }
}

export default service;