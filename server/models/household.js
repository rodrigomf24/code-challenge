var Household = {
  get:{
    all:function() {
      var _this = Household;
      return new Promise(function(resolve, reject) {
        _this.executeQuery('SELECT * FROM household;').then(function(response) {
          if(response.rows !== void(0) && response.rows.length > 0) {
            resolve(response.rows);
          } else {
            reject('Request failed');
          }
        }, function(err) {
          reject(err);
        });
      });
    },
    single:function(id) {
      var _this = Household;
      return new Promise(function(resolve, reject) {
        _this.executeQuery('SELECT * FROM household WHERE id = \''+id+'\';').then(function(response) {
          if(response.rows !== void(0) && response.rows.length > 0) {
            resolve(response.rows);
          } else {
            reject('Request failed');
          }
        }, function(err) {
          reject(err);
        });
      });
    }
  },
  post:function(params) {
    var _this = this;
    return new Promise(function(resolve, reject) {
      var values = params.reduce(function(acc, curr) {
        acc.push('\''+curr+'\'');
        return acc;
      }, []);
      _this.executeQuery('INSERT INTO household (address, zip, city, state, bedrooms_number) VALUES ('+values.join(', ')+') RETURNING id;')
        .then(function(response) {
          if(response.rows !== void(0) && response.rows.length > 0) {
            resolve(response.rows);
          } else {
            reject('Insert failed');
          }
        }, function(error) {
          reject(error);
        });
    });
  },
  put:function(id, params) {
    var _this = this;
    return new Promise(function(resolve, reject) {
      var updates = params.reduce(function(acc, curr) {
        acc.push(curr.field+' = '+'\''+curr.value+'\'');
        return acc;
      }, []);
      _this.executeQuery('UPDATE household SET '+updates.join(', ')+' WHERE id = \''+id+'\' RETURNING id;').then(function(response) {
        if(response.rows !== void(0) && response.rows.length > 0) {
          resolve(response.rows);
        } else {
          reject('Update failed');
        }
      }, function(err) {
        reject(err);
      })
    });
  },
  delete:function(id) {
    var _this = this;
    return new Promise(function(resolve, reject) {
      _this.executeQuery('DELETE FROM household WHERE id = \''+id+'\'; DELETE FROM household_objects WHERE household_id =\''+id+'\';').then(function(response) {
        if('rowCount' in response && response.rowCount > 0) {
          resolve(true);
        } else {
          reject('Request failed');
        }
      }, function(err) {
        reject(err);
      });
    });
  },
  executeQuery:function(sql) {
    return new Promise(function(resolve, reject) {
      console.log('SQL', sql);
      if(sql === null) {
        reject('Invalid SQL');
      }
      var query = DBClient.query(sql, function(err, res) {
        console.log('ERROR', err);
        if (err) reject(err);
        else resolve(res);
      });
    });
  }
};

module.exports = Household;