import { Grid, GridItem, Box, Text, } from "@chakra-ui/react";
import Link from "next/link";
import CommunityCard from "./CommunityCard";
import { Community } from "@/types";


export default function CommunitiesList({ communities }: {
  communities: Community[]
}){
  return (
    <Box h="calc(100dvh - 100px)" overflow="auto">
        <Box position="sticky" top="0" zIndex="20" bg="white">
          <Text fontSize={{ base: "1.4rem", md: "2rem" }} fontWeight="600">
            Discover Communities
          </Text>
          <Text fontSize={{ base: "1.2rem", md: "1.6rem" }} mb="2.4rem">
            Communities you might like
          </Text>
        </Box>
      <Grid pb={{ base: "250px", md: "50px"}}
          templateColumns={{ base: 'repeat(1, 1fr)', sm: "repeat(2, 1fr)", lg: 'repeat(3, 1fr)', xl: 'repeat(4, 1fr)' }} 
          gap={{ base: "1.6rem", md: "2.4rem"}}>
          {
            communities.map(community => (
              <GridItem key={community._id} w='100%' h='100%'>
                <Link href={`/community/${community._id}`}>
                  <CommunityCard {...community} />
                </Link>
              </GridItem>
            ))
          }
        </Grid>
    </Box>
  )
}