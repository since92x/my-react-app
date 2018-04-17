/*eslint no-extra-boolean-cast: 0*/
export const calcSR = arr => {
    const gcds = arr => {
        const gcd = (a, b) => {
            while (!!b) {
                const r = a % b;
                a = b;
                b = r;
            }
            return a;
        };
        let result = arr[0];
        for (let i = 1; i < arr.length; i++)
            result = gcd(arr[i], result);

        return result;
    };
  const g = gcds(arr);
  if(!g) return Array(arr.length+1).join(`0:`).slice(0, -1);
  return arr.map(i=>i/g).join(`:`);
};
// usage:
// calcSR([2,0,6,4])