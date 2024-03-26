
// Example usage
let num1 = "1500000001056";
let num2 = "1500000001223";

console.log(multiply(num1, num2));


function multiply(num1: string, num2: string): string {
    if (num1.length < 2 || num2.length < 2) {
        return (Number(num1) * Number(num2)).toString();
    }

    let maxLength = Math.max(num1.length, num2.length);
    let halfLength = Math.floor(maxLength / 2);

    let a = num1.slice(0, num1.length - halfLength);
    let b = num1.slice(num1.length - halfLength);

    let c = num2.slice(0, num2.length - halfLength);
    let d = num2.slice(num2.length - halfLength);

    let ac = multiply(a, c);
    let bd = multiply(b, d);

    let abcd = subtractStrings(
        subtractStrings(
            multiply(
                addStrings(a, b),
                addStrings(c, d))
            , ac)
        , bd);
    return addStrings(
        padEndWithZeros(ac, halfLength * 2),
        padEndWithZeros(abcd, halfLength),
        bd
    );
}

function padEndWithZeros(str: string, targetLength: number): string {
    return str + '0'.repeat(targetLength);
}

function subtractStrings(num1: string, num2: string): string {
    if (num1[0] === "-" && num2[0] === "-") {
        return "-" + addStrings(num1.slice(1), num2.slice(1))
    } else if (num1[0] === "-" && num2[0] !== "-") {
        return "-" + subtractStrings(num2, num1);
    } else if (num1[0] !== "-" && num2[0] === "-") {
        return addStrings(num1, num2.slice(1))
    }

    let res: string = "";
    for (let i: number = num2.length - 1, j: number = num1.length - 1; j >= 0 || i >= 0; --j, --i) {
        res = (9 - (parseInt(num2[i]) || 0)) + res;
    }
    res = addStrings("1", num1, res)

    if (res[0] === "1") {
        return res.slice(1)
    } else {
        return "-" + res.slice(res.length - num2.length)
    }
}

function addStrings(...numbers: string[]): string {
    let result: string = '';
    let carry: number = 0;
    const lengths: number[] = numbers.map(num => num.length);
    const maxLen: number = Math.max(...lengths);

    for (let i = 0; i < maxLen || carry > 0; i++) {
        let operand: number = carry;

        for (const num of numbers) {
            let tmp: number = i < num.length ? parseInt(num[num.length - i - 1]) : 0;
            operand = operand + tmp;
        }

        carry = Math.floor(operand / 10);
        result = (operand % 10) + result;
    }

    return result;
}
