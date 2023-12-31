export function formatString(input) {
  // Replace ## X with <h3>X</h3>
  let formattedString = input.replace(/## (\w+)/g, '<h3>$1</h3>');

  // Replace **X** with <strong>X</strong>
  formattedString = formattedString.replace(/\*\*([\w\s]+)\*\*/g, '<strong>$1</strong>');

  // Replace * X to <p>X</p>
  formattedString = formattedString.replace(/\* (.*?)(?=\n|\*|$)/g, '<p>$1</p>');

  return formattedString;
  }