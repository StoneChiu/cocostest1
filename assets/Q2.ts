function f1(a: number[], b: number[], v: number): boolean {
    let map = new Map();

    for (let i = 0; i < a.length; i++) {
        map.set(v - a[i], true);
    }

    for (let i = 0; i < b.length; i++) {
        if (map.has(b[i])) {
            return true;
        }
    }

    return false;
}
function f2(a: number[], b: number[], v: number): boolean {
    let map:Record<number, boolean> = {};

    for (let i = 0; i < a.length; i++) {
        map[v - a[i]]= true;
    }

    for (let i = 0; i < b.length; i++) {
        if (map[b[i]]) {
            return true;
        }
    }

    return false;
}
function f3(a: number[], b: number[], v: number): boolean {
    a.sort((x, y) => x - y);
    b.sort((x, y) => x - y);

    let i = 0;
    let j = b.length - 1;

    while (i < a.length && j >= 0) {
        let sum = a[i] + b[j];
        if (sum === v) {
            return true;
        }
        if (sum < v) {
            i++;
        } else {
            j--;
        }
    }

    return false;
}

function f4(a: number[], b: number[], v: number): boolean {
    for(let i = 0; i < a.length; i++) {
        for(let j = 0; j < b.length; j++) {
            if(a[i] + b[j] == v) {
                return true;
            }
        }
    }
    return false;
}

function test(){
    let a = [10, 40, 5, 280];
    let b = [234, 5, 2, 148, 23];
    let v = 42

    console.log(f1(a, b, v));  // 时间复杂度为O(m+n)
    console.log(f2(a, b, v));  //如果不准用Map 时间复杂度为O(m+n)
    console.log(f3(a, b, v));  //如果也不准用obj 时间复杂度为O(m+n log m+n)
    console.log(f4(a, b, v));  //如果也不准用排序 时间复杂度为O((m+n)^2)
}
