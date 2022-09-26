import React from "react";
import Image from "next/image";

import { Account } from "@ledgerhq/live-app-sdk";
import { Flex, Text, Button } from "@chakra-ui/react";
import styles from "./components.module.scss";

type AccountRequestProps = {
  onRequestAccount: any;
  selectedAccount: Account | undefined;
};

function AccountRequest({
  onRequestAccount,
  selectedAccount,
}: AccountRequestProps) {
  return (
    <Flex className={styles.row}>
      <Flex className={styles.account}>
        {selectedAccount ? (
          <>
            <div className={styles.account_icon}>
              <Image
                alt="img"
                src={`/icons/${selectedAccount.currency}.svg`}
                width={24}
                height={24}
              />
            </div>
            <Text className={styles.account_name}>{selectedAccount.name}</Text>
          </>
        ) : null}
      </Flex>
      <Button variant="shade" onClick={onRequestAccount}>
        {selectedAccount ? "Change account" : "Add Account"}
      </Button>
    </Flex>
  );
}

export default AccountRequest;
