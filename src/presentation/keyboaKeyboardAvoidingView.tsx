import {
  KeyboardAvoidingView as KeyboardAvoidingViewPrimitive,
  Platform,
} from 'react-native';

export const KeyboardAvoidingView = ({ children }: React.PropsWithChildren) => {
  return (
    <KeyboardAvoidingViewPrimitive
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      {children}
    </KeyboardAvoidingViewPrimitive>
  );
};
