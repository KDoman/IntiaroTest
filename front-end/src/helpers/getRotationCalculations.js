import { getConvertInchesToCm } from "./getConvertInchesToCm";

export function getKindNegativeResult(value) {
  return -(getConvertInchesToCm(value) / 2);
}

export function getKindPositiveResult(value) {
  return getConvertInchesToCm(value) / 2;
}
