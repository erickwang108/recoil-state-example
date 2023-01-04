import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Tag, Button, ButtonGroup, Box } from '@chakra-ui/react';
import { pokemonListPageAtom, fetchPokemonListSelector } from './atoms';

export default function PokemonPagination({ id }) {
  const currentPage = useRecoilValue(pokemonListPageAtom(id)) + 1;
  const [pokemonList, setPage] = useRecoilState(fetchPokemonListSelector(id));
  const { totalPage } = pokemonList;

  return (
    <Box>
      <ButtonGroup spacing='2' size="sm">
        <Button
          colorScheme='teal'
          variant='outline'
          aria-label="Previous Page"
          disabled={currentPage <= 1}
          onClick={() => setPage('prev')}
          leftIcon={<ArrowLeftIcon />}
        >
          Prev
        </Button>
        <Tag size="md">{currentPage} / {totalPage}</Tag>
        <Button
          colorScheme='teal'
          variant='outline'
          aria-label="Next Page"
          disabled={currentPage >= totalPage}
          onClick={() => setPage('next')}
          rightIcon={<ArrowRightIcon />}
        >
          Next
        </Button>
      </ButtonGroup>
    </Box>
  )
}
