// Get a array<int> from 1 to end_num,, increment by 1
export function createArray(end_num) {
    return Array.from(Array(end_num + 1).keys()).slice(1)
}

// Return the row and col the cell belongs to given its number
export function getNumCoordinate(num) {
    return getRow(num).toString() + getCol(num).toString(); 
}

// Return the row the cell belongs to given its number
export function getRow(num) {
    return Math.ceil(parseInt(num) / 8)
}

// Return the col the cell belongs to given its number
export function getCol(num) {
    return ((parseInt(num) - 1) % 8 + 1);
}

// Return true if the value is inside the array
export function inside(val, arr) {
    return arr.indexOf(val) >= 0;
}

// Create empty array length N
export function createArray2(N, elements = '') {
    let arr = []
    for (let i = 0; i < N; i++) {
        arr.push(elements);
    }
    return arr
}