import {
  VStack,
  Box,
  Divider,
  Button,
  useBreakpointValue,
  Text,
  HStack,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import {
  PostViewPopup,
  ShopCardsListWrapper,
  ShopFilter,
  PostAttachmentsViewer,
  ControlledCarouselProps,
  ControlledCarousel,
  ShopCardAttachment,
  PostAttachment,
  SocialShopCard,
} from "ui";
import { ShopCardsInfoPlaceholder } from "ui/placeholder/social";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import {
  ProfileInfo,
  PostAttachment as PostAttachmentType,
  ShopCardInfo,
} from "types";
import { HiLocationMarker, HiUser } from "react-icons/hi";

export const SellerShopView: React.FC = () => {
  const { t } = useTranslation();
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const router = useRouter();
  return (
    <>
      <VStack
        w={"100%"}
        divider={<Divider borderColor={"gray.200"} opacity="1" />}
      >
        {/* <Text textTransform={"capitalize"} fontSize={"4xl"} fontWeight="bold">
          {t("shop", "shop")}
        </Text> */}
        <PostViewPopup
          fetcher={async ({ queryKey }) => {
            const id = queryKey[1].postId;
            console.log("idParam", queryKey);
            const post = ShopCardsInfoPlaceholder.find(
              (post) => post.id === id
            );
            return post ? post : null;
          }}
          queryName="shopPost"
          idParam="shopPostId"
          renderChild={(props: ShopCardInfo) => {
            return (
              <SocialShopCard
                showCommentInput={false}
                showInteraction={false}
                shopCardInfo={props}
              />
            );
          }}
        />
        <Box w="100%">
          <ShopFilter onlyMobile={false} />
          <ShopCardsListWrapper
            onCardClick={(id) => {
              console.log(router);

              router.push(
                router.pathname,
                { query: { shopPostId: id } },
                { shallow: true }
              );
            }}
            cols={cols}
            items={ShopCardsInfoPlaceholder}
          />
        </Box>
      </VStack>
    </>
  );
};

// export interface ShopPostAttachmentsViewerProps {
//   cardInfo: ShopCardInfo;
//   showFooter?: boolean;
//   carouselProps?: Partial<ControlledCarouselProps>;
//   renderOne?: boolean;
// }

// export const ShopPostAttachmentsViewer: React.FC<ShopPostAttachmentsViewerProps> =
//   ({ attachments, cardInfo, showFooter, carouselProps, renderOne }) => {
//     const [active, setActive] = React.useState<number>();
//     return (
//       <>
//         {attachments && !renderOne && attachments.length > 1 ? (
//           <ControlledCarousel
//             w={"100%"}
//             h="100%"
//             arrows={attachments.length > 1}
//             gap={32}
//             onCurrentActiveChange={setActive}
//             {...carouselProps}
//           >
//             {attachments.map((attachment, i) => (
//               <SocialShopCard
//                 {...cardInfo}
//                 key={attachment.src + i}
//                 productType={"product"}
//                 attachmentProps={{
//                   play: i === active,
//                   footer: showFooter ? (
//                     <HStack color="white" fontSize={"x-large"}>
//                       {attachment.postLocation && (
//                         <HStack>
//                           <Icon as={HiLocationMarker} />
//                           <Text fontSize={"md"}>{attachment.postLocation}</Text>
//                         </HStack>
//                       )}
//                       {/* {profileInfo && profileInfo.name && (
//                         <HStack>
//                           <Icon as={HiUser} />
//                           <Text fontSize={"md"}>{profileInfo.name}</Text>
//                         </HStack>
//                       )} */}
//                     </HStack>
//                   ) : undefined,
//                 }}
//               />
//             ))}
//           </ControlledCarousel>
//         ) : (
//           attachments &&
//           attachments.length > 0 && (
//             <ShopCardAttachment
//               {...cardInfo}
//               {...attachments[0]}
//               productType={"product"}
//               attachmentProps={{
//                 // play: i === active,
//                 footer: showFooter ? (
//                   <HStack color="white" fontSize={"x-large"}>
//                     {attachments[0].postLocation && (
//                       <HStack>
//                         <Icon as={HiLocationMarker} />
//                         <Text fontSize={"md"}>
//                           {attachments[0].postLocation}
//                         </Text>
//                       </HStack>
//                     )}
//                     {/* {profileInfo && profileInfo.name && (
//                         <HStack>
//                           <Icon as={HiUser} />
//                           <Text fontSize={"md"}>{profileInfo.name}</Text>
//                         </HStack>
//                       )} */}
//                   </HStack>
//                 ) : undefined,
//               }}
//             />
//             // <PostAttachment
//             //   {...attachments[0]}
//             //   alt={profileInfo && profileInfo.name}
//             //   footer={
//             //     <HStack p="0.5rem" color="white" fontSize={"xx-large"}>
//             //       {attachments[0].postLocation && (
//             //         <HStack>
//             //           <Icon as={HiLocationMarker} />
//             //           <Text fontSize={"md"}>{attachments[0].postLocation}</Text>
//             //         </HStack>
//             //       )}
//             //       {profileInfo && profileInfo.name && (
//             //         <HStack>
//             //           <Icon as={HiUser} />
//             //           <Text fontSize={"md"}>
//             //             {profileInfo && profileInfo.name}
//             //           </Text>
//             //         </HStack>
//             //       )}
//             //     </HStack>
//             //   }
//             // />
//           )
//         )}
//       </>
//     );
//   };
