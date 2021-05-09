let calculator = {
  read() {
    this.a = +prompt('Enter a number', 0);
    this.b = +prompt('Enter another number', 0);
  },

  sum() {
    return this.a + this.b;
  },

  mul() {
    return this.a * this.b;
  }
}

calculator.read();
alert(`Sum of numbers: ${calculator.sum()}`);
alert(`Product of numbers: ${calculator.mul()}`);