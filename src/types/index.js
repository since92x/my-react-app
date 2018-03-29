// Centralized propType definitions
import { shape, number, bool, string, oneOfType } from 'prop-types';

export const type1 = shape({
  prop1: oneOfType([number, string]),
  prop2: string,
  prop3: bool,
  prop4: type2
});

export const type2 = shape({
  propA: oneOfType([number, string]),
  propB: oneOfType([number, string])
});
