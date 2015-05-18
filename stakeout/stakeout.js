'use strict';

(function() {
    // The hash of all indicies that are no longer able to be
    // considered in the sum.
    var offLimitsHash = {};
    // The highest index in the given array.
    var maxIndex = 0;
    
    /*
     * Updates the hash of indices that are not allowed to
     * be used
     *
     * @param {Array} valueArray - the array to evaluate.
     * @return {Number} - highest possible value.
     */
    var updateOffLimitsHash = function(index) {
        if(index - 1 >= 0) {
            offLimitsHash[index - 1] = true;
        }
        if(index + 1 <= maxIndex) {
            offLimitsHash[index + 1] = true;     
        }
    };
    
    /*
     * Calculates and returns the largest possible sum in a
     * given array using the largest value.
     *
     * @param {Array} valueArray - the array to evaluate (sorted by highest
         value.)
     * @param {Object} originalIndexHash - the hash of the original positions
         for the array.
     * @return {Number} - highest possible value.
     */
    var calculateMax = function(valueArray, originalIndexHash) {
        var total = 0;
        
        for(var i = 0; i <= maxIndex; i ++) {
            var originalIndex = originalIndexHash[valueArray[i]];
            
            // If the value occurs more than once, use just one index.
            if(typeof originalIndex === 'object') {
                originalIndex = originalIndex.pop();
            }

            // if the value can be used, add it to the total
            // and update the off limits hash.
            if(!offLimitsHash[originalIndex]) {     
                total += valueArray[i];
                updateOffLimitsHash(originalIndex);
            }
        }
        
        return total;
    };
    
    /*
     * Uses the largest two values in a given array and returns
     * the largest possible sum of numbers.
     *
     * @param {Array} valueArray - the array to evaluate.
     * @return {Number} - highest possible value.
     */
    var getOptimalResult = function(valueArray) {
        // A hash of all the original indices of the array.
        var indexHash = {};
        // A copy of the indexHash for use in the second run-through.
        var indexHashCopy = {};
        
        offLimitsHash = {};
        maxIndex = valueArray.length - 1;
        
        // Create two identical objects that will have the original
        // index of each value.
        valueArray.forEach(function(item, index) {
            // The object hash will break if there are repeat numbers.
            // In the event of a repeat, create and maintain an array
            // of all indices so that it won't overwrite itself.
            if(typeof indexHash[item] === 'undefined') {
                indexHash[item] = index;
                indexHashCopy[item] = index;
            } else {
                if(!(typeof indexHash[item] === 'object')) {
                    indexHash[item] = [indexHash[item], index];
                    indexHashCopy[item] = [indexHashCopy[item], index];   
                } else {
                    indexHash[item].push(index);
                    indexHashCopy[item].push(index);
                }
            }
        });
        
        // Sort by highest value first.
        valueArray.sort(function(a, b) {
            return a < b;
        });
        
        // Calculate the value using the largest value.
        var firstMax = calculateMax(valueArray, indexHash);
        
        var secondArray = valueArray.splice(1);
        
        // Reset off limits hash and max index for use
        // in the second run.
        offLimitsHash = {};
        maxIndex = secondArray.length - 1;
        
        // Do a second run-through with the next
        // largest number in case we missed a higher value.
        var secondMax = calculateMax(secondArray, indexHashCopy);
        
        // Return the higher of the two values.
        return (firstMax > secondMax) ? firstMax : secondMax;
    };
    
    // Test cases
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

