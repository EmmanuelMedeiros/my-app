import React, { ReactElement } from "react";
import { Button, Dialog, YStack } from "tamagui";

interface DialogProps {
  title?: string;
  description?: string;
  component?: ReactElement
  onOk: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

export default function CDialog({
  onOk,
  component,
  description,
  title,
  open,
  setOpen,
}: DialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <Dialog.Portal>
        <Dialog.Overlay
          backgroundColor="$shadow6"
          onPress={() => setOpen(false)}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          key='dialog-content'
          bordered
          padding="$5"
          elevate
          borderRadius="$6"
          enterStyle={{ y: 10, opacity: 0 }}
          exitStyle={{ y: 10, opacity: 0 }}
        >
          {title && <Dialog.Title>{title}</Dialog.Title>}
          {description && (
            <Dialog.Description>
              {description}
            </Dialog.Description>
          )}

          {component}
          
          <YStack gap={10}>
            <Button onPress={() => { onOk(); setOpen(false) }}>Confirm</Button>
            <Button onPress={() => setOpen(false)}>Close</Button>
          </YStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}