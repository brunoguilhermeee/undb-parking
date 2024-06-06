import 'styled-components';
import { AppTheme } from '../theme.styles';

declare module 'styled-components' {
  interface DefaultTheme extends AppTheme {}
}
