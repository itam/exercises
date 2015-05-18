(function() {
    var offLimitsMap = {};
    var maxIndex = 0;
    
    var updateOffLimitsMap = function(index) {
        if(index - 1 >= 0) {
            this.offLimitsMap[index - 1] = true;
            // console.log('added index', index - 1);
        }
        if(index + 1 <= this.maxIndex) {
            this.offLimitsMap[index + 1] = true;
            // console.log('added index', index + 1);            
        }
        
        // console.log('offLimitsMap ', this.offLimitsMap);
    };
    
    var getOptimalResult = function(valueArray) {    
        var indexMap = {};
        var total = 0;
        
        this.offLimitsMap = {};
        this.maxIndex = valueArray.length - 1;
        
        valueArray.forEach(function(item, index) {
            if(typeof indexMap[item] === 'undefined') {
                indexMap[item] = index;
            } else {
                if(!(typeof indexMap[item] === 'object')) {
                    indexMap[item] = [indexMap[item], index];                    
                } else {
                    indexMap[item].push(index);
                }
            }
        });
        
        // console.log(indexMap);
        
        valueArray.sort(function(a, b) {
            return a < b;
        });
        
        // console.log(valueArray);
        
        for(var i = 0; i <= this.maxIndex; i ++) {
            var originalIndex = indexMap[valueArray[i]];

            // console.log('indexMap: ', indexMap[valueArray[i]]);
            
            if(typeof originalIndex === 'object') {
                originalIndex = originalIndex.pop();
            }
            
            // console.log('index: ', i);
            // console.log('originalIndex:', originalIndex);
            
            // console.log('offLimitsMap ', this.offLimitsMap);

            if(!this.offLimitsMap[originalIndex]) {
                // console.log('added: ', valueArray[i]);
                
                total += valueArray[i];
                updateOffLimitsMap(originalIndex);
                
                // console.log('new total: ', total);
            }
        }
        
        return total;
    };
    
    //console.log(getOptimalResult([ 20, 10, 50, 5, 1 ]));
    //console.log(getOptimalResult([ 20, 50, 10, 1, 5 ]));
    //console.log(getOptimalResult([5, 5, 5, 5, 5]));
    //console.log(getOptimalResult([1, 2, 3, 4, 5]));
    //console.log(getOptimalResult([32, 12, 1, 34, 60]));
    //console.log(getOptimalResult([1, 24, 15, 32, 14, 5, 6]));
    //console.log(getOptimalResult([15, 12, 99, 5, 16, 12]));
    //console.log(getOptimalResult([ 15, 12, 99, 5, 16, 12 ]));
    //console.log(getOptimalResult([]));

}());
