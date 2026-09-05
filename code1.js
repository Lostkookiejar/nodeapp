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

var generateParenthesis = function (n) {
  const result = [];

  function backtrack(current, open, close) {
    if (current.length === 2 * n) {
      result.push(current);
      return;
    }

    if (open < n) {
      backtrack(current + "(", open + 1, close);
    }

    if (close < open) {
      backtrack(current + ")", open, close + 1);
    }
  }

  backtrack("", 0, 0);
  return result;
};

var isValid = function (s) {
  const stack = [];
  const pairs = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  for (let char of s) {
    if (char === "(" || char === "[" || char === "{") {
      stack.push(char);
    } else {
      if (stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
};

var removeElement = function (nums, val) {
  let i = 0;
  for (let j = 0; j < nums.length; j++) {
    if (nums[j] !== val) {
      nums[i] = nums[j];
      i++;
    }
  }
  return i;
};

var mergeTwoLists = function (list1, list2) {
  let dummy = new ListNode();
  let cur = dummy;

  while (list1 && list2) {
    if (list1.val > list2.val) {
      cur.next = list2;
      list2 = list2.next;
    } else {
      cur.next = list1;
      list1 = list1.next;
    }
    cur = cur.next;
  }

  cur.next = list1 || list2;

  return dummy.next;
};

var longestCommonPrefix = function (strs) {
  let pref = strs[0];
  let prefLen = pref.length;

  for (let i = 1; i < strs.length; i++) {
    let s = strs[i];
    while (pref !== s.substring(0, prefLen)) {
      prefLen--;
      if (prefLen === 0) {
        return "";
      }
      pref = pref.substring(0, prefLen);
    }
  }

  return pref;
};

const shiftGrid = (grid, k) => {
  const r = grid.length,
    c = grid[0].length;
  const n = r * c;
  k = k % n;

  if (!k) return grid;

  const shift = (i, j) => {
    while (i < j) {
      [grid[(i / c) | 0][i % c], grid[(j / c) | 0][j % c]] = [
        grid[(j / c) | 0][j % c],
        grid[(i / c) | 0][i % c],
      ];
      i++;
      j--;
    }
  };

  shift(0, n - 1);
  shift(0, k - 1);
  shift(k, n - 1);
  return grid;
};

var combinationSum = function (candidates, target) {
  const res = [];

  function makeCombination(idx, comb, total) {
    if (total === target) {
      res.push([...comb]);
      return;
    }

    if (total > target || idx >= candidates.length) {
      return;
    }

    comb.push(candidates[idx]);
    makeCombination(idx, comb, total + candidates[idx]);
    comb.pop();
    makeCombination(idx + 1, comb, total);
  }

  makeCombination(0, [], 0);
  return res;
};

var divide = function (dividend, divisor) {
  const retIsNegative = Math.sign(divisor) !== Math.sign(dividend);
  dividend = Math.abs(dividend);
  divisor = Math.abs(divisor);

  let ret = 0;
  while (divisor <= dividend) {
    let value = divisor;
    let multiple = 1;
    while (value + value <= dividend) {
      value += value;
      multiple += multiple;
    }
    dividend = dividend - value;
    ret += multiple;
  }

  if (ret > 2 ** 31 - 1) {
    return retIsNegative ? -(2 ** 31) : 2 ** 31 - 1;
  }
  return retIsNegative ? -ret : ret;
};

var lengthOfLongestSubstring = function (s) {
  let set = new Set();
  let left = 0;
  let maxSize = 0;

  if (s.length === 0) return 0;
  if (s.length === 1) return 1;

  for (let i = 0; i < s.length; i++) {
    while (set.has(s[i])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[i]);
    maxSize = Math.max(maxSize, i - left + 1);
  }
  return maxSize;
};

var myAtoi = function (s) {
  s = s.trim(); // Remove leading whitespace
  if (s.length === 0) return 0;

  let sign = 1,
    i = 0,
    res = 0;

  // Check for sign
  if (s[i] === "-") {
    sign = -1;
    i++;
  } else if (s[i] === "+") {
    i++;
  }

  // Process numerical characters
  while (i < s.length && s[i] >= "0" && s[i] <= "9") {
    res = res * 10 + (s[i] - "0");

    // Handle overflow
    if (sign * res > 2 ** 31 - 1) return 2 ** 31 - 1;
    if (sign * res < -(2 ** 31)) return -(2 ** 31);

    i++;
  }

  return sign * res;
};

var minimumPushes = function (word) {
  let histo = Array(26).fill(0);
  word.split("").forEach((x) => {
    histo[x.charCodeAt(0) - 97] += 1;
  });
  histo = histo.sort((a, b) => b - a).filter((x) => x > 0);
  let result = 0;
  let i = 0;
  let loop = 1;
  while (i < histo.length) {
    if (i != 0 && i % 8 == 0) {
      loop += 1;
    }
    result += histo[i] * loop;
    i += 1;
  }
  return result;
};

var minimumPushes = function (word) {
  let freq = new Array(26).fill(0);

  for (let i = 0; i < word.length; i++) {
    freq[word.charCodeAt(i) - 97]++;
  }

  freq.sort((a, b) => b - a);

  let ans = 0;
  for (let i = 0; i < 26; i++) {
    ans += (Math.floor(i / 8) + 1) * freq[i];
  }
  return ans;
};

var maxProduct = function (nums) {
  let largest = -Infinity;
  let secondLargest = -Infinity;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] >= largest) {
      secondLargest = largest;
      largest = nums[i];
    }
    if (nums[i] > secondLargest && nums[i] < largest) {
      secondLargest = nums[i];
    }
  }
  return (largest - 1) * (secondLargest - 1);
};

var maximumProduct = function (nums) {
  nums = nums.sort((a, b) => b - a);

  let n = nums.length;
  let top3 = nums[0] * nums[1] * nums[2];
  let oneLargeTwoSmall = nums[0] * nums[n - 2] * nums[n - 1];

  return Math.max(top3, oneLargeTwoSmall);
};

var maxProduct = function (n) {
  let max1 = -1;
  let max2 = -1;

  while (n > 0) {
    const digit = n % 10;

    if (digit >= max1) {
      max2 = max1;
      max1 = digit;
    } else if (digit > max2) {
      max2 = digit;
    }

    n = Math.floor(n / 10);
  }

  return max1 * max2;
};

function cogRpm(cogs, n) {
  const teethN = cogs[n];

  function rpmAtEnd(end) {
    const lo = Math.min(n, end);
    const hi = Math.max(n, end);
    // if any cog between n and the end (inclusive) is missing, the train is jammed
    for (let i = lo; i <= hi; i++) {
      if (cogs[i] === 0) return 0;
    }
    const meshes = Math.abs(end - n);
    const sign = meshes % 2 === 0 ? 1 : -1;
    return (sign * teethN) / cogs[end];
  }

  return [rpmAtEnd(0), rpmAtEnd(cogs.length - 1)];
}

function sum(a, b) {
  if (b !== undefined) return a + b;
  return (b) => a + b;
}

function createPalindrome(str) {
  const n = str.length;
  for (let i = 0; i < Math.floor(n / 2); i++) {
    const diff = Math.abs(str.charCodeAt(i) - str.charCodeAt(n - 1 - i));
    if (diff !== 0 && diff !== 2) return false;
  }
  return true;
}
function solve(s) {
  const n = s.length;
  for (let i = 0; i < Math.floor(n / 2); i++) {
    const diff = Math.abs(s.charCodeAt(i) - s.charCodeAt(n - 1 - i));
    if (diff !== 0 && diff !== 2) return false;
  }
  return true;
}
function sum(a, b) {
  if (b !== undefined) return a + b;
  return (b) => a + b;
}

const alphabetMap = new Map();

for (let i = 0; i < 26; i++) {
  // String.fromCharCode(97) starts at 'a'
  const letter = String.fromCharCode(97 + i);
  const value = i + 1; // Assign position value (1 to 26)

  alphabetMap.set(letter, value);
}

function wordsToMarks(string) {
  let ret = 0;
  for (let i = 0; i < string.length; i++) {
    ret += alphabetMap.get(string[i]);
  }
  return ret;
}

function spEng(sentence) {
  return sentence.toLowerCase().includes("english");
}

function toAcronym(inp) {
  let ret = "";
  ret += inp[0].toUpperCase();
  for (let i = 1; i < inp.length - 1; i++) {
    if (inp[i] == " ") {
      ret += inp[i + 1].toUpperCase();
    }
  }
  return ret;
}

function last(...arg) {
  var moreThan1 = arg.length > 1;

  if (!moreThan1) {
    switch (typeof arg[0]) {
      case "object":
        return arg[0][arg[0].length - 1];
        break;
      case "number":
        return arg[0];
        break;
      case "string":
        return arg[0][arg[0].length - 1];
        break;
    }
  } else {
    switch (typeof arg[arg.length - 1]) {
      case "object":
        return arg[arg.length - 1];
        break;
      case "number":
        return arg[arg.length - 1];
        break;
      case "string":
        return arg[arg.length - 1];
        break;
    }
  }
}

function split(string, mask) {
  console.log(string);
  console.log(mask);

  var strLength = string ? string.length : 0;
  var maskLength = mask[0] ? mask.reduce((acc, val) => acc + val) : 0;

  if (strLength == 0 && maskLength == 0) {
    return [];
  }

  if (maskLength != strLength) return null;

  var start = 0,
    end = 0,
    ret = [];
  for (const len of mask) {
    end += len;
    ret.push(string.slice(start, end));
    start += len;
  }
  return ret;
}

function initializeNames(name) {
  const parts = name.split(" ");
  if (parts.length <= 2) return name;

  const first = parts[0];
  const last = parts[parts.length - 1];
  const middles = parts.slice(1, -1).map((m) => m[0] + ".");

  return [first, ...middles, last].join(" ");
}

function getCount(str) {
  return str.split("").filter((ele) => /[aeiou]/i.test(ele)).length;
}
function findNextSquare(sq) {
  const root = Math.sqrt(sq);
  if (!Number.isInteger(root)) return -1;
  return (root + 1) ** 2;
}

function brightest(colors) {
  const value = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return Math.max(r, g, b);
  };

  return colors.reduce((best, current) =>
    value(current) > value(best) ? current : best,
  );
}

function expressionMatter(a, b, c) {
  return Math.max(
    a + b + c,
    a * b * c,
    a * (b + c),
    (a + b) * c,
    a + b * c,
    a * b + c,
  );
}

function getPlanetName(id) {
  var name;
  switch (id) {
    case 1:
      return "Mercury";
    case 2:
      return "Venus";
    case 3:
      return "Earth";
    case 4:
      return "Mars";
    case 5:
      return "Jupiter";
    case 6:
      return "Saturn";
    case 7:
      return "Uranus";
    case 8:
      return "Neptune";
  }

  return name;
}

function nearestSq(n) {
  const root = Math.round(Math.sqrt(n));
  return root * root;
}

function calculateTotal(team1, team2) {
  const sum1 = team1.reduce((a, b) => a + b, 0);
  const sum2 = team2.reduce((a, b) => a + b, 0);
  return sum1 > sum2;
}

function mirror(data) {
  if (data.length === 0) return [];

  const sorted = [...data].sort((a, b) => a - b);
  const max = sorted[sorted.length - 1];
  const rest = sorted.slice(0, -1); // everything except the max, still ascending

  return [...rest, max, ...rest.slice().reverse()];
}

function alphabetWar(fight) {
  const leftPower = { w: 4, p: 3, b: 2, s: 1 };
  const rightPower = { m: 4, q: 3, d: 2, z: 1 };

  let leftScore = 0;
  let rightScore = 0;

  for (const char of fight) {
    if (leftPower[char]) leftScore += leftPower[char];
    if (rightPower[char]) rightScore += rightPower[char];
  }

  if (leftScore > rightScore) return "Left side wins!";
  if (rightScore > leftScore) return "Right side wins!";
  return "Let's fight again!";
}

function firstNonRepeated(s) {
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    // check if this char appears anywhere else in the string
    if (s.indexOf(char) === s.lastIndexOf(char)) {
      return char;
    }
  }
  return null; // your code here
}

function collision(x1, y1, radius1, x2, y2, radius2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance <= radius1 + radius2; // collision?
}
function swapHeadAndTail(arr) {
  var ret = [];
  ret.push(...arr.slice(Math.round(arr.length / 2), arr.length));
  if (arr.length % 2 != 0) {
    ret.push(arr[Math.floor(arr.length / 2)]);
  }
  ret.push(...arr.slice(0, Math.floor(arr.length / 2)));
  return ret;
}

function multiples(a, b, limit) {
  const result = [];
  const lcm = (a * b) / gcd(a, b);

  for (let n = lcm; n <= limit; n += lcm) {
    result.push(n);
  }

  return result;
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function stackHeight2d(layers) {
  if (layers === 0) return 0;
  return 1 + (layers - 1) * (Math.sqrt(3) / 2);
}
