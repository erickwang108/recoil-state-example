import { ChakraProvider } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';

import styled from 'styled-components';
import TodoList from './components/TodoList';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

function App() {
  return (
    <ChakraProvider>
      <RecoilRoot>
        <Container>
          <TodoList />
        </Container>
      </RecoilRoot>
    </ChakraProvider>
  );
}

export default App;
