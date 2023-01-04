import { Spinner } from '@chakra-ui/react';
import styled from 'styled-components';

const SpinnerContainer = styled.div`
  width: 338px;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function PokemonLoader() {
  return (
    <SpinnerContainer>
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    </SpinnerContainer>
  );
}
