export interface PoapAsset {
  created: string;
  event: {
    city: string;
    country: string;
    description: string;
    end_date: string;
    event_url: string;
    expiry_date: string;
    fancy_id: string;
    id: number;
    image_url: string;
    name: string;
    start_date: string;
    supply: number;
    year: number;
  };
  owner: string;
  tokenId: string;
}

export interface NormalizedPoapData {
  collectionSlug: string;
  collectionName: string;
  collectionImage: string;
  assets: { id: string; name: string; image: string; description: string }[];
}

export interface OpenSeaAsset {
  id: number;
  name: string;
  image_url: string;
  image_preview_url: string;
  image_original_url: string;
  image_thumbnail_url: string;
  permalink: string;
  description: string;
  collection: {
    name: string;
    slug: string;
    image_url: string;
  };
  asset_contract: {
    name: string;
  };
  token_id: string;
}

export type NftMetadata = {
  assets: OpenSeaAsset[];
};

export type NftCollection = {
  id: number;
  collectionSlug: string;
  collectionName: string;
  collectionImage: string;
  assets: {
    id: string;
    name: string;
    image: string;
    openseaLink: string;
    description: string;
  }[];
}[];

export type User = {
  id: string;
  name: string;
  gm_count: number;
};
