import React from "react";
import { useRecoilState } from "recoil";
import {
  Card,
  CardBody,
  Heading,
  Stack,
  Box,
  Divider,
  CardHeader,
  CardFooter,
  StackDivider,
} from '@chakra-ui/react';
import { fetchPokemonListSelector } from './atoms';
import PokemonPagination from './PokemonPagination';
import PokemonItem from './PokemonItem';

export default function PokemonList({ id }) {
  const [pokemonList] = useRecoilState(fetchPokemonListSelector(id));

  if (!pokemonList) {
    return <div>Pokemon is not exist, please check query parameters.</div>
  }

  return (
    <Box p='4'>
      <Card maxW='md' width="360px">
        <CardHeader><Heading size="md">Pokémon: {id}</Heading></CardHeader>
        <Divider />
        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            {pokemonList?.results.map((pokemon, index) => <PokemonItem key={index} {...pokemon} />)}
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <PokemonPagination id={id} />
        </CardFooter>
      </Card>
    </Box >
  );
}
