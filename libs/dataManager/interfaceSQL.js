var SQL = (function(){
    function _select(fields , table, limit, condition){
        
        var conditions = '';
        
        for(var column in  condition ){
            
            conditions += column + ' = ' + ""+condition[column]+"" + ' AND ';
        }
        
        return 'SELECT ' + fields.join(',') +' FROM ' + table + ' WHERE ' + conditions + ' LIMIT ' + limit;
    }
    
    function _update(fields, condition){
    
    }
    
    function _delete(condition, top){
        
    }
    
    function _insert(table, values){
        
    }
    
    function _query(){
        
    }
    
    return{
        Select : _select,
        Update : _update,
        Delete : _delete,
        Query  : _query 
    }
})();

module.exports = SQL;