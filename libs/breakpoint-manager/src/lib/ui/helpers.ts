import { IBreakpoint } from '../types';
import Laptop from '../assets/icons/laptop.svg';
import Tablet from '../assets/icons/tablet.svg';
import Mobile from '../assets/icons/mobile.svg';
import PC from '../assets/icons/pc.svg';

export const getBreakpointIcon = (breakpoint: IBreakpoint) => {
  const { bottom } = breakpoint;

  if (bottom <= 320) return Mobile;
  if (bottom <= 750) return Tablet;
  if (bottom <= 1001) return Laptop;
  return PC;
};
