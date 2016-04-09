var service = {
    get:{
        household:{
            single:function(id) {
                return service.executeRequest('GET', 'household/'+id);
            },
            all:function() {
                return service.executeRequest('GET', 'household');
            }
        },
        persons:{
            fromHusehold:function(householdId) {
                
            }
        },
        vehicles:{
            fromHousehold:function(householdId) {
                
            }
        }
    },
    post:{
        household:function(params) {
            
        },
        persons:function(params, householdId) {
            
        },
        vehicles:function(params, householdId) {
            
        }
    },
    put:{
        household:function(params) {
            
        },
        persons:function(params, householdId) {
            
        },
        vehicles:function(params, householdId) {
            
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