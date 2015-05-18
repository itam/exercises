(function() {
    var offLimitsMap = {};
    var maxIndex = 0;
    
    var updateOffLimitsMap = function(index) {
        if(index - 1 >= 0) {
            this.offLimitsMap[index - 1] = true;
        }
        if(index + 1 <= this.maxIndex) {
            this.offLimitsMap[index + 1] = true;     
        }
    };
    
    var calculateMax = function(valueArray, originalIndexMap) {
        var total = 0;
        
        for(var i = 0; i <= this.maxIndex; i ++) {
            var originalIndex = originalIndexMap[valueArray[i]];
            
            if(typeof originalIndex === 'object') {
                originalIndex = originalIndex.pop();
            }

            if(!this.offLimitsMap[originalIndex]) {     
                total += valueArray[i];
                updateOffLimitsMap(originalIndex);
            }
        }
        
        return total;
    };
    
    var getOptimalResult = function(valueArray) {    
        var indexMap = {};
        var indexMapCopy = {};
        var total = 0;
        
        this.offLimitsMap = {};
        this.maxIndex = valueArray.length - 1;
        
        valueArray.forEach(function(item, index) {
            if(typeof indexMap[item] === 'undefined') {
                indexMap[item] = index;
                indexMapCopy[item] = index;
            } else {
                if(!(typeof indexMap[item] === 'object')) {
                    indexMap[item] = [indexMap[item], index];
                    indexMapCopy[item] = [indexMapCopy[item], index];   
                } else {
                    indexMap[item].push(index);
                    indexMapCopy[item].push(index);
                }
            }
        });
        
        valueArray.sort(function(a, b) {
            return a < b;
        });
        
        var firstMax = calculateMax(valueArray, indexMap);
        
        var secondArray = valueArray.splice(1);
        this.offLimitsMap = {};
        this.maxIndex = secondArray.length - 1;
        
        var secondMax = calculateMax(secondArray, indexMapCopy);
        
        return (firstMax > secondMax) ? firstMax : secondMax;
    };
      
    console.log(getOptimalResult([ 20, 10, 50, 5, 1 ]));
    console.log(getOptimalResult([ 20, 50, 10, 1, 5 ]));
    console.log(getOptimalResult([ 15, 12, 99, 5, 16, 12 ]));
    console.log(getOptimalResult([ 5, 5, 5, 5, 5 ]));
    console.log(getOptimalResult([ 1, 2, 3, 4, 5 ]));
    console.log(getOptimalResult([ 32, 12, 1, 34, 60 ]));
    console.log(getOptimalResult([ 1, 24, 15, 32, 14, 5, 6 ]));
    console.log(getOptimalResult([ 2, 3, 2]));
    console.log(getOptimalResult([ ]));

}());
