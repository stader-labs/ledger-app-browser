import Image from "next/image";
import { useCallback, useMemo } from "react";
import Select, { components, OptionTypeBase } from "react-select";
import { Account } from "@ledgerhq/live-app-sdk";
import styles from "./components.module.scss";
import { Flex, Box } from "@chakra-ui/react";

const AccountIcon = ({ currencyId }: { currencyId: string }) => (
  <div className={styles.icon_container}>
    <Image src={`/icons/${currencyId}.svg`} alt="img" width={24} height={24} />
  </div>
);
const AccountOption: typeof components.Option = ({
  children,
  data,
  ...rest
}) => (
  <components.Option data={data} {...rest} className={styles.dark_text}>
    <AccountIcon currencyId={data.data.currency} />
    <Flex className={styles.account_details}>
      {
        //@ts-ignore
        <span className={styles.account_name2}>{children}</span>
      }
      <span className={styles.account_address}>{data.data.address}</span>
    </Flex>
  </components.Option>
);

const AccountSummary: typeof components.SingleValue = ({
  children,
  data,
  ...rest
}) => (
  <components.SingleValue {...rest} data={data}>
    {/* <Flex> */}
    <AccountIcon currencyId={data.data.currency} />
    {
      //@ts-ignore
      <Box className={styles.account_name2} ml="16px">
        {children}
      </Box>
    }
    {/* </Flex> */}
  </components.SingleValue>
);

const getSelectStyles = () => ({
  control: (provided: any) => ({
    ...provided,
    width: 400,
    backgroundColor: "transparent",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontSize: 12,
    color: "#F7F1FF",
  }),
  indicatorsContainer: (provided: any) => ({
    ...provided,
    color: "red",
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "#1D1D1D",
  }),
  option: (
    provided: any,
    { isFocused, isSelected }: { isFocused: boolean; isSelected: boolean }
  ) => ({
    ...provided,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontSize: 12,
    color: isSelected ? "#8c8c8c" : "#F7F1FF",
    backgroundColor: isSelected
      ? isFocused
        ? "#2B2B2B"
        : "#1D1D1D"
      : isFocused
      ? "#363636"
      : "transparent",
  }),
});

type AccountSelectorProps = {
  accounts: Account[];
  onAccountChange: (account: Account | undefined) => void;
  selectedAccount: Account | undefined;
};

function fromAccountToOption(account: Account): OptionTypeBase {
  return {
    label: account.name,
    value: `${account.id}`,
    data: {
      address: account.address,
      balance: account.balance,
      currency: account.currency,
    },
  };
}

function AccountSelector({
  accounts,
  onAccountChange,
  selectedAccount,
}: AccountSelectorProps) {
  const options = useMemo(
    () => accounts.map((account) => fromAccountToOption(account)),
    [accounts]
  );
  const value = useMemo(
    () => (selectedAccount ? fromAccountToOption(selectedAccount) : undefined),
    [selectedAccount]
  );
  const styles2 = getSelectStyles();

  const handleOnChange = useCallback(
    (option: OptionTypeBase | null) => {
      const newSelectedAccount = option
        ? accounts.find((account) => account.id === option.value)
        : undefined;
      onAccountChange(newSelectedAccount);
    },
    [accounts, onAccountChange]
  );

  return (
    <div>
      <Select
        instanceId="account"
        options={options}
        // className={styles.select}
        styles={styles2}
        components={{ SingleValue: AccountSummary, Option: AccountOption }}
        onChange={handleOnChange}
        value={value}
        isSearchable={false}
      />
    </div>
  );
}

export default AccountSelector;
