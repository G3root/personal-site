import {
  Accordion,
  AccordionButton,
  AccordionHeader,
  AccordionItem as HeadlessAccordionItem,
  AccordionPanel as HeadlessAccordionPanel,
} from "solid-headless";
import { Component, createResource, For, ParentComponent } from "solid-js";
import ChevronRight from "~icons/heroicons-outline/chevron-right";

import { getAllNfts } from "../api/getNfts";

type AccordionPanelProps = {
  nfts: {
    id: string;
    name: string;
    image: string;
    description: string;
    openseaLink?: string;
  }[];
};

const AccordionPanel: Component<AccordionPanelProps> = (props) => {
  return (
    <HeadlessAccordionPanel class="mb-2">
      <For each={props.nfts}>
        {(item, index) => (
          <div>
            <div class="md:col-span-2">
              <img
                width={200}
                height={200}
                class="rounded-md"
                alt={`${item.name} nft`}
                src={item.image}
              />
            </div>
            <div class="md:col-span-10">
              <div class="flex items-center space-x-2">
                <h3 class="mt-4 text-lg font-semibold ">{item.name}</h3>
                {item.openseaLink ? (
                  <a
                    href={item.openseaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {/* <FiExternalLink class="mt-4" /> */}
                  </a>
                ) : null}
              </div>
              <p class="mt-4 max-w-2xl break-words  text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          </div>
        )}
      </For>
    </HeadlessAccordionPanel>
  );
};

interface AccordionItemProps {
  name?: string;
  image?: string;
  items?: number;
}

const AccordionItem: ParentComponent<AccordionItemProps> = (props) => {
  return (
    <HeadlessAccordionItem value={props.name}>
      <AccordionHeader>
        <AccordionButton
          as="div"
          class="group relative mb-3 w-full max-w-5xl rounded-2xl p-3 bg-slate-4 focus:ring-2"
        >
          {({ isSelected }) => (
            <>
              <span class="relative flex w-full flex-wrap items-center space-x-2">
                <img
                  width={45}
                  height={45}
                  alt={`${props.name} nft collection`}
                  src={props.image}
                  class="rounded-full"
                />
                <div class="flex-1 ">
                  <div class="flex w-full items-center justify-between">
                    <h3 class=" text-lg font-semibold ">{props.name}</h3>
                    <div class="flex items-center space-x-2">
                      <span>{props.items}</span>

                      <ChevronRight
                        aria-hidden
                        class={`${
                          isSelected() ? "transform rotate-90" : ""
                        } h-5 w-5 transition delay-150 ease-out`}
                      />
                    </div>
                  </div>
                </div>
              </span>
            </>
          )}
        </AccordionButton>
      </AccordionHeader>
      {props.children}
    </HeadlessAccordionItem>
  );
};

interface FAQ {
  question: string;
  answer: string;
}

export const NftList = () => {
  const [nfts] = createResource(getAllNfts);

  if (typeof nfts() === undefined) {
    return;
  }

  return (
    <>
      <Accordion defaultValue={undefined} class="space-y-2" toggleable>
        <For each={nfts()?.nft}>
          {(nft) => (
            <AccordionItem
              name={nft.collectionName}
              image={nft.collectionImage}
              items={nft.assets.length}
            >
              <AccordionPanel nfts={nft.assets} />
            </AccordionItem>
          )}
        </For>
      </Accordion>
      <Accordion defaultValue={undefined} class="space-y-2" toggleable>
        <AccordionItem
          name={nfts()?.poap.collectionName}
          image={nfts()?.poap.collectionImage}
          items={nfts()?.poap.assets.length}
        >
          <AccordionPanel nfts={nfts()?.poap.assets ?? []} />
        </AccordionItem>
      </Accordion>
    </>
  );
};
