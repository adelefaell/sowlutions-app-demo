function isValidBracketSequence(text: string): boolean {
  const stack: string[] = []

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char)
    }

    else if (char === ')' || char === ']' || char === '}') {
      if (stack.length === 0) {
          return false
      }
      const lastOpened = stack[stack.length - 1]

      if (char === ')' && lastOpened !== '(') return false
      if (char === ']' && lastOpened !== '[') return false
      
      if (char === '}' && lastOpened !== '{') return false

      
      stack.pop()
    }
  }

  return stack.length === 0
}

// usage
console.log(isValidBracketSequence("()[]{}"))
console.log(isValidBracketSequence("([{}])"))
console.log(isValidBracketSequence("("))
console.log(isValidBracketSequence("[(])"))
console.log(isValidBracketSequence("{[}]"))
console.log(isValidBracketSequence(""))