import { Button, FormControl, FormLabel, IconButton, Input, InputGroup, InputProps, InputRightElement, useBoolean } from "@chakra-ui/react";
import { ForwardedRef, HTMLAttributes, MutableRefObject, forwardRef, useState } from "react";
import EyeOffIcon from '@/assets/icons/eyeOff';
import { Children } from "@/types";

function AuthInput({ labelText, isRequired, inputRef, ...props }: HTMLAttributes<HTMLInputElement> & InputProps & {
  labelText: string
  inputRef: MutableRefObject<HTMLInputElement>
}){
  return(
    <FormControl isRequired>
      <FormLabel fontSize="1.6rem" fontWeight="500">{labelText}</FormLabel>
      <Input
        _focusWithin={{ outline: "0", border: "1px solid", borderColor: "primary.800", boxShadow: "0" }}
        _focusVisible={{ outline: "0", border: "1px solid", borderColor: "primary.800", boxShadow: "0" }}
        borderRadius="1rem"
        h="unset"
        ref={inputRef}
        fontSize="1.6rem"
        color="#181818"
        _placeholder={{ color: "currentColor", fontSize: "1.4rem" }}
        p="1.5rem"
        {...props}
      />
    </FormControl>
  )
}



export function PasswordInput({ labelText, isRequired, inputRef, ...props }: HTMLAttributes<HTMLInputElement> & InputProps & {
  labelText: string
  inputRef: MutableRefObject<HTMLInputElement>
}){
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl isRequired>
      <FormLabel fontSize="1.6rem" fontWeight="500">Password</FormLabel>
      <InputGroup size="md">
        <Input
          p="1.5rem"
          {...props}
          onChange={props.onChange}
          value={props.value}
          type={showPassword ? 'text' : 'password'}
          _focusWithin={{ outline: "0", border: "1px solid",  borderColor: "primary.800", boxShadow: "0" }}
          _focusVisible={{ outline: "0", border: "1px solid",  borderColor: "primary.800", boxShadow: "0" }}
          borderRadius="1rem"
          h="unset"
          ref={inputRef}
          fontSize="1.6rem"
          color="#18181880"
          _placeholder={{ color: "currentColor", fontSize: "1.4rem"}}
        />
        <InputRightElement width="4.5rem" mt="1.25rem">
          <IconButton
            type="button"
            bg="transparent"
            h="1.5rem"
            aria-label="hide password"
            icon={<EyeOffIcon />}
            onClick={() => setShowPassword(prev => !prev)}
            _hover={{ bg: 'transparent' }}
          />
        </InputRightElement>
      </InputGroup>
    </FormControl>
  )
}

export const SubmitButton = ({ children, loading }: {
  children: Children["children"]
  loading?: boolean
}) => {
  return (
    <Button
      type="submit"
      py="1.5rem"
      px="1rem"
      borderRadius="1rem"
      fontSize="1.6rem"
      fontWeight="400"
      bg="primary.900"
      mt="2rem"
      h="unset"
      w="100%"
      color="white"
      _hover={{ bg: 'primary.700' }}
      isLoading={loading}
      cursor="pointer"
    >
      {children}
    </Button>
  )
}


export const BasicInput = forwardRef<HTMLInputElement, InputProps & { labelText: string }>(
  ({ ...props }: any, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <AuthInput {...props} inputRef={ref}/>
    );
  },
);
BasicInput.displayName = "BasicInput"

export const PasswordTypeInput = forwardRef<HTMLInputElement, InputProps & {labelText: string}>(
  ({ ...props }: any, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <PasswordInput {...props} inputRef={ref}/>
    );
  },
);
PasswordTypeInput.displayName = "PasswordTypeInput"
