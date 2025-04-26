def reverse_number(num):
  # Reverse the number
  num_str = str(num)
  reverse = num_str[::-1]
  # Return the number
  return int(reverse)

## Example usage:
print(reverse_number(1223)) # Output: 3221
print(reverse_number(987654321)) # Output: 123456789