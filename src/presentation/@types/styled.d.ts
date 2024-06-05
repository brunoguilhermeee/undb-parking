import 'styled-components';
import { AppTheme } from '../styles/theme';

declare module 'styled-components' {
  interface DefaultTheme extends AppTheme {}
}
