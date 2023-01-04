import React from "react";
import { Button, Heading, Box } from '@chakra-ui/react';
import { useSetRecoilState } from "recoil";
import { pokemonDetailUrlSelector } from "./atoms";

export default function PokemonItem({ name, url }) {
  const setPokemonUrl = useSetRecoilState(pokemonDetailUrlSelector);

  return (
    <Box>
      <Heading size='xs' textTransform='uppercase'>
        {name}
      </Heading>
      <Button
        size="sm"
        color='teal'
        variant="link"
        onClick={() => setPokemonUrl(url)}
      >
        {url}
      </Button>
    </Box>
  );
}
