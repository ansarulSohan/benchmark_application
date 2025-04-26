/*
AI: Certainly!
You can create a function that takes in a number and returns its reverse.
Here’s how you can do it:
*/

function reverseNumber(number) {
  const numString = String(number);

  const reversedString = numString.split('').reverse().join('');

  const reversedNumber = parseInt(reversedString, 10);
  return reversedNumber;
}
// Example usage:
console.log(reverseNumber(12230)); // Output: 3221
console.log(reverseNumber(987654321)); // Output: 123456789
