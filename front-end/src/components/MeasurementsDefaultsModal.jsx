import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

export function MeasurementsDefaultsModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen}>Dodatkowe informacje</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Dodatkowe informacje
              </ModalHeader>
              <ModalBody>
                <p className="tracking-wider">
                  Gdy w transformach jest rotacja (czyli jest 90 albo -90 w
                  matrixie) to działamy na osi Z (dzielimy głębokość na pół)
                  Jeśli nie ma rotacji (czyli jest wszędzie 0 w matrixie) to na
                  osi X (dzielimy szerokość na pół) Zdjęcia mebli typu corner są
                  przedstawione w taki sposób w jaki zostały wyeksportowane
                  przez grafika, jeśli nie jesteśmy pewni z którego
                  &quot;obrazka&quot; powinniśmy skorzystać, najlepszym sposobem
                  jest postawienie go na pustej scenie w 360 i porównać z
                  obrazkami poniżej
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
