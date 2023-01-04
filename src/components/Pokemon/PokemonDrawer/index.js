import React, { useEffect, Suspense, useCallback } from "react";
import { useRecoilState } from "recoil";
import {
  Button,
  Drawer,
  Divider,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerContent,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { pokemonDetailUrlSelector } from '../atoms';
import PokemonLoader from "../PokemonLoader";
import PokemonDetail from "./PokemonDetail";

export default function PokemonDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [url, setUrl] = useRecoilState(pokemonDetailUrlSelector);
  const onHandleClose = useCallback(() => {
    setUrl();
    onClose();
  }, [onClose, setUrl]);

  useEffect(() => {
    if (url) {
      onOpen();
    }
  }, [onOpen, url]);

  return (
    <Drawer
      size="sm"
      isOpen={isOpen}
      placement='right'
      onClose={onHandleClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Pokémon Details</DrawerHeader>
        <Divider />

        <DrawerBody>
          <Suspense fallback={<PokemonLoader />}>
            <PokemonDetail />
          </Suspense>
        </DrawerBody>

        <DrawerFooter>
          <Button variant='outline' mr={3} onClick={onHandleClose}>
            Close
          </Button>
          <Button
            colorScheme='blue'
            onClick={() => {
              console.log('save...');
            }}
          >
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
