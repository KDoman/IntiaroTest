import X_LETTER from "../assets/X.svg";
import Z_LETTER from "../assets/Z.svg";
import Y_LETTER from "../assets/Y.svg";

export function getCorrectSVG(number) {
  switch (number) {
    case 1:
      return X_LETTER;
    case 2:
      return Y_LETTER;
    case 3:
      return Z_LETTER;
  }
}
