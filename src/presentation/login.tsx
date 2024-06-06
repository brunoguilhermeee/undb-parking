import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from './keyboaKeyboardAvoidingView';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import styled, { css } from 'styled-components';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { authGatewayHttp } from '@/core/factory';

export const Container = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing['10']};
  margin-top: ${({ theme }) => theme.spacing['11']};
  font-family: ${({ theme }) => theme.font.regular};
`;

export const Input = styled(TextInput)`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.gray[700]};
    color: 1px solid ${theme.colors.gray[400]};
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

export const ErrorMessage = styled(Text)`
  ${({ theme }) => css`
    margin: ${theme.spacing[3]} auto 0;
    color: ${theme.colors.red[500]};
    font-size: 16px;
    font-family: ${theme.font.medium};
  `};
`;

export const InputError = styled(Text)`
  ${({ theme }) => css`
    margin: ${theme.spacing[1]} 0 0;
    color: ${theme.colors.red[500]};
    font-size: 12px;
    font-family: ${theme.font.regular};
  `};
`;

const schema = z.object({
  registration: z.string({
    required_error: 'Informe a matricula',
    message: 'Matricula inválida',
  }),
  password: z.string({ required_error: 'Informe a senha' }),
});

export const LoginScreen = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit: handleFormSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const handleSubmit = handleFormSubmit(async data => {
    // Descomentar caso queira realizar o login com a API
    // const result = await authGatewayHttp.login(data);
    // if (!result) {
    //   setErrorMessage('Matricula ou senha inválida.');
    //   return;
    // }

    router.navigate('/parking/list');
  });

  useEffect(() => {
    register('registration');
    register('password');
  }, [register]);

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
              <Input
                onChangeText={text => setValue('registration', text)}
                placeholder="Digite sua matrícula"
              />
              {errors?.registration?.message && (
                <InputError>{errors?.registration?.message}</InputError>
              )}
            </View>
            <View>
              <Label>Senha *</Label>
              <Input
                onChangeText={text => setValue('password', text)}
                secureTextEntry
                placeholder="Digite sua senha"
              />
              {errors?.password?.message && (
                <InputError>{errors?.password?.message}</InputError>
              )}
            </View>
          </FieldsContainer>

          <ForgetPasswordContainer>
            <ForgetPasswordText>Esqueceu sua senha?</ForgetPasswordText>
            <ForgetPasswordDetail>Recupere</ForgetPasswordDetail>
          </ForgetPasswordContainer>

          <SubmitButton onPress={handleSubmit}>
            <SubmitButtonText>Entrar</SubmitButtonText>
          </SubmitButton>

          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </View>
      </Container>
    </KeyboardAvoidingView>
  );
};
