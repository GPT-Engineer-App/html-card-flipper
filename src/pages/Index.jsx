import { useState } from "react";
import { Box, Button, Text, useDisclosure, VStack, HStack, IconButton, Tooltip } from "@chakra-ui/react";
import { FaCode, FaEye, FaMousePointer, FaRegClipboard } from "react-icons/fa";

const Index = () => {
  const [htmlContent, setHtmlContent] = useState("<div><h1>Title</h1><p>Description here...</p></div>");
  const [showSource, setShowSource] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toggleView = () => setShowSource(!showSource);

  const handleElementMouseOver = (event) => {
    event.stopPropagation();
    const path = event.target.tagName.toLowerCase();
    event.target.title = path;
  };

  const handleElementClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedElement(event.target.outerHTML);
    onOpen();
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    alert(`Custom actions for: ${event.target.tagName}`);
  };

  return (
    <VStack spacing={4} p={5}>
      <HStack spacing={4}>
        <Button leftIcon={showSource ? <FaEye /> : <FaCode />} onClick={toggleView}>
          {showSource ? "View Rendered" : "View Source"}
        </Button>
        {selectedElement && (
          <Tooltip label="Copy to clipboard" hasArrow>
            <IconButton icon={<FaRegClipboard />} onClick={() => navigator.clipboard.writeText(selectedElement)} aria-label="Copy to clipboard" />
          </Tooltip>
        )}
      </HStack>
      <Box as={showSource ? "textarea" : "div"} w="full" h="300px" p={4} border="1px solid" borderColor="gray.300" borderRadius="md" overflow="auto" bg={showSource ? "white" : "transparent"} readOnly={showSource} value={showSource ? htmlContent : undefined} dangerouslySetInnerHTML={showSource ? undefined : { __html: htmlContent }} onMouseOver={!showSource ? handleElementMouseOver : undefined} onClick={!showSource ? handleElementClick : undefined} onContextMenu={!showSource ? handleContextMenu : undefined} />
      {selectedElement && isOpen && (
        <Box p={4} bg="gray.100" borderRadius="md">
          <Text fontSize="sm">Selected HTML:</Text>
          <Text fontSize="xs" p={2} bg="white" borderRadius="md">
            {selectedElement}
          </Text>
          <Button size="sm" mt={2} onClick={onClose}>
            Close
          </Button>
        </Box>
      )}
    </VStack>
  );
};

export default Index;
