/**
 * 
 * @param {*} array The array to delete elements to.
 * 
 * @returns {string} value of last array.
 */

function pop(array) { 
    var x = array[array.length - 1]
    array.length = array.length - 1;
    
    return x;
}