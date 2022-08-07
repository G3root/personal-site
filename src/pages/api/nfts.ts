import type { APIContext } from "astro";
import { cache } from "~/utils/cache";
import { NFT_CACHE_KEY, POAP_CACHE_KEY } from "~/constants";
import type { NftMetadata, NormalizedPoapData, PoapAsset } from "~/types";

export async function get({ params, request }: APIContext) {
  if (cache.has(NFT_CACHE_KEY) && cache.has(POAP_CACHE_KEY)) {
    return {
      body: JSON.stringify({
        nft: await cache.get(NFT_CACHE_KEY),
        poap: await cache.get(POAP_CACHE_KEY),
      }),
    };
  }

  const poapReq = await fetch(
    "https://api.poap.xyz/actions/scan/0xD2eCE15856813709Dd181A55c9fC82059Fdb2E2c"
  );
  // const nftRes: NftMetadata = await nftReq.json();
  // hardcoded until i get access to opensea api keys
  const nftRes: NftMetadata = {
    assets: [
      {
        id: 89124955,
        image_url:
          "https://openseauserdata.com/files/e36e30343aeedc3e10ddef62eb8aeb6e.svg",
        image_original_url: "",
        image_preview_url:
          "https://openseauserdata.com/files/e36e30343aeedc3e10ddef62eb8aeb6e.svg",
        image_thumbnail_url:
          "https://openseauserdata.com/files/e36e30343aeedc3e10ddef62eb8aeb6e.svg",
        name: "Dev #3741",
        description:
          "Developers around the world are tired of working and contributing their time and effort to enrich the top 1%. Join the movement that is community owned, building the future from the bottom up.",
        asset_contract: {
          name: "Devs for Revolution",
        },
        permalink:
          "https://opensea.io/assets/ethereum/0x25ed58c027921e14d86380ea2646e3a1b5c55a8b/3741",
        collection: {
          image_url:
            "https://lh3.googleusercontent.com/6Jbode0t_bTO9MHYoYvjIW9nHENCxOs40EGg3Z5ptg4lLlD2z2WXEAIrjyV929aQnIi94hPL4VZ3Pl2NWOO_tSaO6gdjdrcMHrF9=s120",

          name: "Devs for Revolution",

          slug: "devs-for-revolution",
        },
        token_id: "3741",
      },
    ],
  };
  const poapRes: PoapAsset[] = await poapReq.json();

  const nftCollectionBucket: string[] = [];
  const nftCollection = [];
  const poapCollection: NormalizedPoapData = {
    collectionSlug: "poap",
    collectionName: "POAP",
    collectionImage:
      "https://lh3.googleusercontent.com/FwLriCvKAMBBFHMxcjqvxjTlmROcDIabIFKRp87NS3u_QfSLxcNThgAzOJSbphgQqnyZ_v2fNgMZQkdCYHUliJwH-Q=s60",
    assets: [],
  };

  for (let index = 0; index < nftRes.assets.length; index++) {
    const nft = nftRes.assets[index];
    if (nftCollectionBucket.includes(nft.collection.name)) {
      nftCollection.find(function (obj) {
        if (obj.collectionName === nft.collection.name)
          obj.assets.push({
            id: nft.token_id,
            name: nft.name,
            image: nft.image_preview_url,
            openseaLink: nft.permalink,
            description: nft.description,
          });
      });
    } else {
      nftCollectionBucket.push(nft.collection.name);
      nftCollection.push({
        id: nft.id,
        collectionSlug: nft.collection.slug,
        collectionName: nft.collection.name,
        collectionImage: nft.collection.image_url,
        assets: [
          {
            id: nft.token_id,
            name: nft.name,
            image: nft.image_preview_url,
            openseaLink: nft.permalink,
            description: nft.description,
          },
        ],
      });
    }
  }

  for (let index = 0; index < poapRes.length; index++) {
    const poap = poapRes[index];
    poapCollection.assets.push({
      id: poap.tokenId,
      image: poap.event.image_url,
      name: poap.event.name,
      description: poap.event.description,
    });
  }
  cache.set(POAP_CACHE_KEY, poapCollection);
  cache.set(NFT_CACHE_KEY, nftCollection);
  return {
    body: JSON.stringify({
      nft: nftCollection,
      poap: poapCollection,
    }),
  };
}
