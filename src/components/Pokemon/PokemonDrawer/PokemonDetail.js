import React from "react";
import { useRecoilValue } from "recoil";
import {
  Box,
  Text,
  HStack,
  Image,
} from "@chakra-ui/react";
import { pokemonDetailSelector } from '../atoms';

export default function PokemonDetail() {
  const pokemon = useRecoilValue(pokemonDetailSelector);

  if (!pokemon) {
    return null;
  }

  return (
    <>
      <HStack spacing='24px'>
        <Box w='170px' h='10'>
          <Text as='b'>ID</Text>
        </Box>
        <Box w='170px' h='10'>
          <Text>{pokemon.id}</Text>
        </Box>
      </HStack>
      <HStack spacing='24px'>
        <Box w='170px' h='10'>
          <Text as='b'>Name</Text>
        </Box>
        <Box w='170px' h='10'>
          <Text>{pokemon.name}</Text>
        </Box>
      </HStack>
      <HStack spacing='24px'>
        <Box w='170px' h='10'>
          <Text as='b'>Base Experience</Text>
        </Box>
        <Box w='170px' h='10'>
          <Text>{pokemon.base_experience}</Text>
        </Box>
      </HStack>
      <HStack spacing='24px'>
        <Box w='170px' h='10'>
          <Text as='b'>Height</Text>
        </Box>
        <Box w='170px' h='10'>
          <Text>{pokemon.height}cm</Text>
        </Box>
      </HStack>
      <HStack spacing='24px'>
        <Box w='170px' h='10'>
          <Text as='b'>Weight</Text>
        </Box>
        <Box w='170px' h='10'>
          <Text>{pokemon.weight}</Text>
        </Box>
      </HStack>
      <HStack spacing='24px'>
        {pokemon.images.map((src, index) => <Box key={index}>
          <Image
            boxSize='100px'
            objectFit='cover'
            src={src}
          />
        </Box>)}
      </HStack>
    </>
  );
}
