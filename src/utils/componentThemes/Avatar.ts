import { Avatar, Show } from '@chakra-ui/react'

import { avatarAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(avatarAnatomy.keys)

const small = defineStyle({
  width: 30,
  height: 30,
  fontSize: "md"
})
const medium = defineStyle({
  width: 45,
  height: 45,
  fontSize: "lg"
})
const large = defineStyle({
  width: 45,
  height: 45,
  fontSize: "2xl"
})

const sizes = {
  small: definePartsStyle({ container: small }),
  medium: definePartsStyle({ container: medium }),
  large: definePartsStyle({ container: large }),
}

export default defineMultiStyleConfig({ sizes })

