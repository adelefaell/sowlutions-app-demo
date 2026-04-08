function validateEmail(email:string) {
  if (email == null) return false

  let n = email.length

  if (n === 0 || n > 256) return false

  let atCount = 0
  let atIndex = -1
  let lastDotIndex = -1

  for (let i = 0; i < n; i++) {
    let ch = email[i]

    if (ch === '@') {
      atCount++

      if (atCount > 1) return false

      if (i === 0 || i === n - 1) return false

      atIndex = i;
    }

    if (ch === '.') {
      if (i > 0 && email[i - 1] === '@') return false
      if (i < n - 1 && email[i + 1] === '@') return false

      lastDotIndex = i
    }
  }

  if (atCount !== 1) return false

  if (lastDotIndex === -1 || lastDotIndex < atIndex) return false
  
  if (n - lastDotIndex - 1 < 2) return false

  return true;
}


console.log(validateEmail('john.doe@gmail.com'))
console.log(validateEmail('john@doe@gmail.com'))
console.log(validateEmail('john@gmail.c'))
console.log(validateEmail('john@.com'))