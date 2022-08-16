import { Fragment } from "preact";
import {
  Disclosure,
  DisclosureContent,
  useDisclosureState,
} from "ariakit/disclosure";
import type { DisclosureState } from "ariakit/disclosure";
import type { GetAllNfts } from "../api/nfts";
import { FiChevronRight, FiExternalLink } from "react-icons/fi";

interface DisclosureButtonProps {
  name: string;
  image: string;
  items: number;
  state: DisclosureState;
}

const DisclosureButton = (props: DisclosureButtonProps) => {
  const { name, image, items, state } = props;
  return (
    <Disclosure
      state={state}
      className="disclosure group relative mb-3 w-full max-w-5xl rounded-2xl p-3 bg-slate-4 focus:ring-2 "
    >
      <span className="relative flex w-full flex-wrap items-center space-x-2">
        <img
          width={45}
          height={45}
          alt={`${name} nft collection`}
          src={image}
          className="rounded-full"
        />
        <div className="flex-1 ">
          <div className="flex w-full items-center justify-between">
            <h3 className=" text-lg font-semibold ">{name}</h3>
            <div className="flex items-center space-x-2">
              <span>{items}</span>
              <FiChevronRight
                /*
      // @ts-ignore */
                className="chevron h-5 w-5 transition delay-100 ease-out"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </span>
    </Disclosure>
  );
};

interface DisclosureContentItemsProps {
  nfts: {
    id: string;
    name: string;
    image: string;
    description: string;
    openseaLink?: string;
  }[];
  state: DisclosureState;
}

const DisclosureContentItems = (props: DisclosureContentItemsProps) => {
  const { nfts, state } = props;

  return (
    <DisclosureContent state={state} className="mb-2">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
        {nfts.map((data) => (
          <Fragment key={data.id}>
            <div className="md:col-span-2">
              <img
                width={200}
                height={200}
                className="rounded-md"
                alt={`${data.name} nft`}
                src={data.image}
              />
            </div>
            <div className="md:col-span-10">
              <div className="flex items-center space-x-2">
                <h3 className="mt-4 text-lg font-semibold ">{data.name}</h3>
                {data.openseaLink ? (
                  <a
                    href={data.openseaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiExternalLink
                      /*
      // @ts-ignore */
                      className="mt-4"
                    />
                  </a>
                ) : null}
              </div>
              <p className="mt-4 max-w-2xl break-words  text-gray-600 dark:text-gray-400">
                {data.description}
              </p>
            </div>
          </Fragment>
        ))}
      </div>
    </DisclosureContent>
  );
};

type NftListProps = { data: GetAllNfts };

export const NftList = (props: NftListProps) => {
  const { data } = props;
  const nftDisclosure = useDisclosureState();
  const poapDisclosure = useDisclosureState();

  return (
    <div className="mt-6 grid  grid-cols-1">
      <div data-animate style="--stagger:3" className="flex  flex-col gap-y-2">
        {data.nft.map((item) => (
          /*
      // @ts-ignore */
          <Fragment key={item?.id}>
            <div>
              <DisclosureButton
                state={nftDisclosure}
                name={item.collectionName}
                image={item.collectionImage}
                items={item.assets.length}
              />
            </div>
            <DisclosureContentItems state={nftDisclosure} nfts={item.assets} />
          </Fragment>
        ))}
        <div data-animate style="--stagger:3">
          <DisclosureButton
            state={poapDisclosure}
            name={data.poap.collectionName}
            image={data.poap.collectionImage}
            items={data.poap.assets.length}
          />
        </div>

        <DisclosureContentItems
          state={poapDisclosure}
          nfts={data.poap.assets}
        />
      </div>
    </div>
  );
};
