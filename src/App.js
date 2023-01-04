import { Suspense } from 'react';
import { RecoilEnv, RecoilRoot } from 'recoil';
import { ChakraProvider, Heading, Center, Box, Stack } from '@chakra-ui/react';
import { PokemonList, PokemonDrawer, PokemonLoader } from './components/Pokemon';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

function App() {
  return (
    <ChakraProvider>
      <RecoilRoot>
        <Center>
          <Heading size='lg' fontSize='50px'>
            My Pokémon
          </Heading>
        </Center>
        <Stack spacing={8} direction='row' align='center' justify='center'>
          <Box maxW='350px'>
            <Suspense fallback={<PokemonLoader />}>
              <PokemonList id="p1" />
            </Suspense>
          </Box>
          <Box maxW='350px'>
            <Suspense fallback={<PokemonLoader />}>
              <PokemonList id="p2" />
            </Suspense>
          </Box>
        </Stack>
        <PokemonDrawer />
      </RecoilRoot>
    </ChakraProvider>
  );
}

export default App;
