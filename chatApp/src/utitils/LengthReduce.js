class LengthReduce {
  text(text = '') {
    const pattarn = /\s/gi;
    const str = text.split(pattarn);

    if (str.length >= 3) {
      let headerTitle = str
        .filter((ele, i) => i <= 2)
        .reduce((acc, cur) => (acc += ` ${cur}`));
      return `${headerTitle}..`;
    } else {
      return text;
    }
  }
}

const lengthReduce = new LengthReduce();
export default lengthReduce;
