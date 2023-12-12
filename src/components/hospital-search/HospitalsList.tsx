import { Flex, Link, Stack, Text, Box } from '@chakra-ui/react';

const HospitalList = ({
  hospitals
}: {
  hospitals: {
    displayName: { text: string };
    formattedAddress: string;
    googleMapsUri: string;
  }[];
}) => {
  return (
    <Flex flexDir="column" gap=".5rem">
      <Text>Here are the hospitals and clinics near you:</Text>
      <Stack spacing="1.5rem">
        {hospitals.map((hospital, index) => {
          const { displayName, formattedAddress, googleMapsUri } = hospital;
          return (
            <Box key={index}>
              <Text>
                {index + 1}. {displayName.text}
              </Text>
              <Link
                href={googleMapsUri}
                isExternal
                color="primary.900"
                fontWeight="bold"
                textDecor="underline"
                _hover={{ textDecor: 'none' }}
                display="inline-flex"
              >
                {formattedAddress}
              </Link>
            </Box>
          );
        })}
      </Stack>
      <Text>Click on the hospital address to get directions.</Text>
    </Flex>
  );
};

export default HospitalList;
