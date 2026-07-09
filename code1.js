var romanToInt = function (s) {
  let res = 0;
  const roman = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  for (let i = 0; i < s.length - 1; i++) {
    if (roman[s[i]] < roman[s[i + 1]]) {
      res -= roman[s[i]];
    } else {
      res += roman[s[i]];
    }
  }

  return res + roman[s[s.length - 1]];
};

const nMax = 1e5,
  mod = 1e9 + 7,
  bmod = BigInt(mod),
  powMod = new BigInt64Array(nMax + 1).fill(1n, 0, 1);
for (let i = 1; i <= nMax; i++) powMod[i] = (powMod[i - 1] * 10n) % bmod;

var sumAndMultiply = function (s, queries) {
  const n = s.length,
    m = queries.length,
    sumPfs = new Uint32Array(n + 1),
    concatPfs = new Uint32Array(n + 1),
    countPfs = new Uint32Array(n + 1);
  // O(n): Build prefix sum tables
  for (let i = 0; i < n; i++) {
    const x = ~~s[i];
    sumPfs[i + 1] = sumPfs[i] + x;
    if (x) {
      concatPfs[i + 1] = (concatPfs[i] * 10 + x) % mod;
      countPfs[i + 1] = countPfs[i] + 1;
    } else {
      concatPfs[i + 1] = concatPfs[i];
      countPfs[i + 1] = countPfs[i];
    }
  }
  // O(m): Calculate query answers using prefix sum tables
  for (let q = 0; q < m; q++) {
    const [ql, qr] = queries[q],
      count = countPfs[qr + 1] - countPfs[ql],
      sum = sumPfs[qr + 1] - sumPfs[ql],
      concatR = concatPfs[qr + 1],
      concatL = Number((BigInt(concatPfs[ql]) * powMod[count]) % bmod),
      concat = (concatR - concatL + mod) % mod;
    queries[q] = (concat * sum) % mod;
  }
  return queries;
};

var sumAndMultiply = function (n) {
  const digitsStr = n.toString();
  let xStr = "";
  let sum = 0;

  for (let i = 0; i < digitsStr.length; i++) {
    const digitChar = digitsStr[i];
    if (digitChar !== "0") {
      xStr += digitChar;
      sum += Number(digitChar);
    }
  }

  // If there are no non-zero digits, x should be 0
  const x = xStr === "" ? 0 : Number(xStr);

  return x * sum;
};

console.log("hello");

var threeSumClosest = function (nums, target) {
  nums.sort((a, b) => a - b);
  let closest = nums[0] + nums[1] + nums[2];

  for (let i = 0; i < nums.length - 2; i++) {
    // skip duplicate i values (optional optimization)
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (Math.abs(sum - target) < Math.abs(closest - target)) {
        closest = sum;
      }

      if (sum === target) {
        return sum; // can't get closer than exact match
      } else if (sum < target) {
        left++;
      } else {
        right--;
      }
    }
  }

  return closest;
};
