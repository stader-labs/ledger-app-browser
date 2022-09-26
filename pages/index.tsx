import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DAPPBrowser } from "../src/DAPPBrowser";
import { ChainConfig } from "../src/DAPPBrowser/types";
import { getFirstValueFromArray } from "../src/helpers";

const Home: NextPage = () => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Early return if the page is not mounted yet
  if (!mounted) {
    return null;
  }

  const {
    params: dappBrowserParams,
    accountId,
    ...dappQueryParams
  } = router.query;

  const rawParams = getFirstValueFromArray(dappBrowserParams);
  const initialAccountId = getFirstValueFromArray(accountId);

  const params = rawParams ? JSON.parse(rawParams) : {};

  const {
    networks: chainConfigs,
    nanoApp,
    dappUrl,
    dappName = "DApp",
  }: {
    networks: ChainConfig[];
    nanoApp: string;
    dappUrl: string;
    dappName: string;
  } = params;

  // Early return if no dapp provided (no dappUrl available in the query)
  if (!dappUrl) {
    return null;
  }

  return (
    <DAPPBrowser
      dappQueryParams={dappQueryParams}
      dappName={dappName}
      dappUrl={dappUrl}
      nanoApp={nanoApp}
      chainConfigs={chainConfigs}
      initialAccountId={initialAccountId}
    />
  );
};

export default Home;
