import { Center, Spinner } from "@chakra-ui/react";

interface DappLoaderProps {
  name: string;
}
const DappLoader = ({ name }: DappLoaderProps) => {
  switch (name) {
    default:
      return (
        <Center
          alignItems="center"
          justifyContent="center"
          h="100vh"
          bg="Polygon_Background"
          width="100%"
        >
          <Spinner size="lg" color="Polygon_Color" />
        </Center>
      );
  }
};

export default DappLoader;
