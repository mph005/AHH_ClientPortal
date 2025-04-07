import { ReactNode } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Navbar from './Navbar';
import Footer from './Footer';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Flex direction="column" minH="100vh">
      <Navbar />
      <Box flex="1" as="main">
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};

export default MainLayout; 