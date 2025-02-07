function filterRange(arr, a, b) {
    // добавлены скобки вокруг выражения для улучшения читабельности
    return arr.filter(item => (a <= item && item <= b));
  }
  
let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);