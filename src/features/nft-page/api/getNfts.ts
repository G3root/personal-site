import type { NftCollection, NormalizedPoapData } from "~/types";

type getAllNfts = {
  nft: NftCollection;
  poap: NormalizedPoapData;
};

export const getAllNfts = async (): Promise<getAllNfts> => {
  const req = await fetch("/api/nfts");
  const res = await req.json();

  return res;
};
