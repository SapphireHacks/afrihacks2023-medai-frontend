import { Avatar, Show } from '@chakra-ui/react'


export const UserChatAvatar = ({ imageSrc, name }: {
  imageSrc?: string
  name: string
}) => {
  return (
    <>
      <Show below="md">
        <Avatar bg="primary.900" src={imageSrc} name={name} size={"medium"} />
      </Show>
      <Show above="md">
        <Avatar bg="primary.900" src={imageSrc} name={name} size={"large"} />
      </Show>
    </>
  )
}

export const MedAIChatAvatar = () => {
  return (
    <>
      <Show below="md">
        <Avatar bg="secondary.900" src={'/medai-avatar.png'} name="MedAI" size={"small"} />
      </Show>
      <Show above="md">
        <Avatar bg="secondary.900" src={'/medai-avatar.png'} name="MedAI" size={"large"} />
      </Show>
    </>
  )
}