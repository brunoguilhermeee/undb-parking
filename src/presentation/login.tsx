import { KeyboardAvoidingView } from './keyboaKeyboardAvoidingView';
import { router } from 'expo-router';
import {
  Image,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import styled, { css } from 'styled-components';

export const Container = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing['10']};
  font-family: ${({ theme }) => theme.font.regular};
`;

export const Input = styled(TextInput)`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.gray[700]};
    border-radius: 8px;
    padding: ${theme.spacing[4]};
  `}
`;

export const Title = styled(Text)`
  ${({ theme }) => css`
    font-size: 24px;
    font-family: ${theme.font.bold};
    color: ${theme.colors.gray[800]};
  `}
`;

export const Description = styled(Text)`
  ${({ theme }) => css`
    font-size: 14px;
    font-family: ${theme.font.regular};
    color: ${theme.colors.gray[600]};
  `}
`;

export const Label = styled(Text)`
  ${({ theme }) => css`
    font-size: 14px;
    font-family: ${theme.font.regular};
    color: ${theme.colors.gray[600]};
    margin-bottom: ${theme.spacing['1']};
  `}
`;

export const FieldsContainer = styled(View)`
  ${({ theme }) => css`
    margin-top: ${theme.spacing[6]};
    gap: ${theme.spacing[4]};
  `}
`;

export const ForgetPasswordContainer = styled(View)`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing[2]};
  align-items: center;
  justify-content: center;
  margin: ${({ theme }) => theme.spacing[6]} 0;
`;

export const ForgetPasswordDetail = styled(Text)`
  flex-direction: row;
  font-family: ${({ theme }) => theme.font.black};
  color: ${({ theme }) => theme.colors.gray[800]};
`;

export const SubmitButton = styled(Pressable)`
  background-color: ${({ theme }) => theme.colors.pink[500]};
  border-radius: 32px;
  width: 236px;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[3]};
`;

export const SubmitButtonText = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.font.medium};
`;

export const TextGroup = styled(View)`
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const ForgetPasswordText = styled(Text)`
  ${({ theme }) => css`
    color: ${theme.colors.gray[600]};
  `};
`;

export const LoginScreen = () => {
  function handleSubmit() {
    router.navigate('/parking/list');
  }

  return (
    <KeyboardAvoidingView>
      <Container>
        <Image source={require('@/presentation/assets/images/logo.png')} />

        <View>
          <TextGroup>
            <Title>Bem-vindo de volta!</Title>
            <Description>
              Preencha seus dados para acessar seu aplicativo de estacionamento
              da UNDB
            </Description>
          </TextGroup>

          <FieldsContainer>
            <View>
              <Label>Sua matrícula *</Label>
              <Input placeholder="Digite sua matrícula" />
            </View>
            <View>
              <Label>Senha *</Label>
              <Input placeholder="Digite sua senha" />
            </View>
          </FieldsContainer>

          <ForgetPasswordContainer>
            <ForgetPasswordText>Esqueceu sua senha?</ForgetPasswordText>
            <ForgetPasswordDetail>Recupere</ForgetPasswordDetail>
          </ForgetPasswordContainer>

          <SubmitButton onPress={handleSubmit}>
            <SubmitButtonText>Entrar</SubmitButtonText>
          </SubmitButton>
        </View>
      </Container>
    </KeyboardAvoidingView>
  );
};
