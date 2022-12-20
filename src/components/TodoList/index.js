import React, { useState } from "react";
import { useRecoilValue, useRecoilState, useRecoilCallback } from 'recoil';
import { Box, Input, Heading, Divider, VStack, Button } from "@chakra-ui/react";
import { idsState, itemState } from './atoms';

const Container = ({ children, onClear }) => {
  return (
    <Box display="flex" flexDir="column" alignItems="center" pt={10}>
      <Box width="400px" backgroundColor="yellow.100" p={5} borderRadius="lg">
        <Heading size="lg" mb={4}>
          Shopping List
        </Heading>
        <VStack spacing={3} divider={<Divider borderColor="rgba(86, 0, 0, 0.48)" />}>
          {children}
        </VStack>
      </Box>
      <Button variant="link" mt={3} onClick={onClear}>
        Clear list
      </Button>
    </Box>
  )
}

const Item = ({ id }) => {
  const [item, setItem] = useRecoilState(itemState(id))

  return (
    <Box
      rounded="md"
      textDecoration={item.checked ? 'line-through' : ''}
      opacity={item.checked ? 0.5 : 1}
      _hover={{ textDecoration: 'line-through' }}
      cursor="pointer"
      width="100%"
      onClick={() => setItem({ ...item, checked: !item.checked })}
    >
      {item.label}
    </Box>
  )
}

const NewItemInput = ({ onInsert }) => {
  const [value, setValue] = useState('')

  return (
    <Input
      value={value}
      placeholder="New item"
      padding={0}
      height="auto"
      border="none"
      _focus={{ border: 'none' }}
      _placeholder={{ color: 'rgba(86, 0, 0, 0.48)' }}
      onChange={(e) => {
        setValue(e.currentTarget.value)
      }}
      onKeyPress={({ key }) => {
        if (key === 'Enter') {
          onInsert(value)
          setValue('')
        }
      }}
    />
  )
}

export default function TodoList() {
  const ids = useRecoilValue(idsState);
  const nextId = ids.length;

  const insertItem = useRecoilCallback(({ set }) => (label) => {
    set(idsState, [...ids, nextId])
    set(itemState(nextId), { label, checked: false })
  })

  return (
    <Container onClear={() => 1}>
      {ids.map((id) => (
        <Item key={id} id={id} />
      ))}
      <NewItemInput
        onInsert={(label) => {
          insertItem(label);
        }}
      />
    </Container>
  );
}