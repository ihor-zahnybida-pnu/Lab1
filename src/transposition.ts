import { Key, Matrix } from "./type";

export class Transposition {
  private key: string;
  private keyWord: Key[] = [];
  private text: string;
  private matrix: Matrix[][] = [];
  private rows: number;
  private cols: number;

  constructor(key: string = "key", text: string = "програмне забезпечення") {
    this.key = key;
    this.text = text;

    this.rows = Math.ceil(this.text.length / this.key.length);
    this.cols = this.key.length;
  }

  prepareKey = () => {
    for (var i = 0; i < this.key.length; i++) {
      this.keyWord.push({ index: i, newIndex: 0, value: this.key[i] });
    }

    this.keyWord.sort((w1, w2) => {
      if (w1.value > w2.value) {
        return 1;
      }

      if (w1.value < w2.value) {
        return -1;
      }

      return 0;
    });

    this.keyWord.forEach((kw, index) => (kw.newIndex = index));
  };

  prepareMatrix = () => {
    let index = 0;

    for (var y = 0; y < this.rows; y++) {
      const line: Matrix[] = [];
      for (var x = 0; x < this.cols; x++) {
        line.push({
          x,
          y,
          newX: -1,
          value: this.text[index] ?? " ",
        });
        ++index;
      }
      this.matrix.push(line);
    }
  };

  encrypt = () => {
    this.matrix.forEach((r) => {
      r.map(
        (el) =>
          (el.newX = this.keyWord.find((k) => el.x === k.index)?.newIndex ?? -1)
      );
      return r;
    });

    for (var x = 0; x < this.text.length; x++) {
      this.matrix.forEach((line) => {
        line.sort((el1, el2) => {
          if (el1.newX > el2.newX) {
            return 1;
          }

          if (el1.newX < el2.newX) {
            return -1;
          }

          return 0;
        });
      });
    }

    let res = this.matrix
      .map((x) => {
        return x.map((el) => el.value).join();
      })
      .join();
    return res.replace(/,/gi, "");
  };

  decrypt = () => {
    for (var x = 0; x < this.text.length; x++) {
        this.matrix.forEach((line) => {
          line.sort((el1, el2) => {
            if (el1.x > el2.x) {
              return 1;
            }
  
            if (el1.x < el2.x) {
              return -1;
            }
  
            return 0;
          });
        });
      }
  
      let res = this.matrix
        .map((x) => {
          return x.map((el) => el.value).join();
        })
        .join();
      return res.replace(/,/gi, "");
  };
}
