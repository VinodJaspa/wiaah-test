import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { AffiliationOfferCardInfo } from "types";
import {
  SocialAffiliationCard,
  ListWrapper,
  SocialAffiliationCardProps,
  ListWrapperProps,
  GridWrapper,
  useAffiliationPostViewPopup,
  AffiliationPostViewModal,
} from "@UI";
import { NumberShortner } from "../../../helpers";
import { PostAttachment } from "../PostAttachment";

export interface AffiliationOffersCardListWrapperProps
  extends Partial<SocialAffiliationCardProps> {
  items: AffiliationOfferCardInfo[];
  cols?: number;
  wrapperProps?: Partial<ListWrapperProps>;
  grid?: boolean;
}

export const AffiliationOffersCardListWrapper: React.FC<
  AffiliationOffersCardListWrapperProps
> = ({ items, cols = 3, wrapperProps, grid, ...props }) => {
  const { setCurrentPost } = useAffiliationPostViewPopup();

  if (grid) {
    return (
      <>
        <AffiliationPostViewModal />
        <GridWrapper
          cols={cols}
          itemProps={{ bgColor: "primary.main" }}
          items={items.map((post, i) => ({
            displayVariant: i === 1 ? "large" : i === 3 ? "portrait" : "normal",
            component: (
              <PostAttachment
                multiply={post.attachments.length > 1}
                style={{ onClick: () => setCurrentPost(post.id) }}
                blur
                minimal
                controls={false}
                key={i}
                src={(post.attachments && post.attachments[0].src) || ""}
                type={(post.attachments && post.attachments[0].type) || ""}
                footer={
                  post.views ? (
                    <Text
                      w="100%"
                      px="1rem"
                      textAlign={"start"}
                      fontSize={"lg"}
                      fontWeight="bold"
                      color="white"
                    >
                      {NumberShortner(post.views)}
                    </Text>
                  ) : undefined
                }
              />
            ),
          }))}
        />
      </>
    );
  } else {
    return (
      <ListWrapper {...wrapperProps} cols={cols}>
        {items.map((offer, i) => (
          <SocialAffiliationCard showComments {...props} key={i} {...offer} />
        ))}
      </ListWrapper>
    );
  }
};

export default AffiliationOffersCardListWrapper;
