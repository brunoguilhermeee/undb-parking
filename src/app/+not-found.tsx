import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import styled, { css } from 'styled-components';

export const Container = styled(View)`
  align-items: center;
  justify-content: center;
  flex: 1;
  font-family: ${({ theme }) => theme.font.regular};
`;

export const LinkText = styled(Text)`
  ${({ theme }) => css`
    color: ${theme.colors.gray[500]};
    text-decoration: underline;
  `}
`;
export const Title = styled(Text)`
  ${({ theme }) => css`
    color: ${theme.colors.gray['800']};
    font-size: 24px;
    font-family: ${({ theme }) => theme.font.black};
    margin-bottom: ${({ theme }) => theme.spacing[5]};
  `}
`;

export default function NotFoundScreen() {
  return (
    <Container>
      <Title>Tela não encontrada</Title>
      <Link href="/login">
        <LinkText>Ir para a tela de login</LinkText>
      </Link>
    </Container>
  );
}
