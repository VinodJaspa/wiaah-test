import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { mapArray } from "utils";
import { useAdminGetContentCommentsQuery } from "@features/Social";
import { ContentHostType, Profile } from "@features/API";
import { useReactPubsub } from "react-pubsub";
import { PostCommentCard } from "@blocks/Social";
import CommentInputBox from "@UI/components/shadcn-components/Fields/commentBox";
import { AnyIfEmpty } from "react-redux";

export const useSocialContentCommentsModal = () => {
    const { Listen, emit, removeListner } = useReactPubsub(
        () => "showSocialContentComments"
    );

    function open(contentType: string, contentId: string) {
        emit({ id: contentId, type: contentType });
    }

    function close() {
        emit();
    }

    return {
        open,
        close,
        Listen,
        removeListner,
    };
};

export const CommentsModal: React.FC = () => {
    const { Listen, removeListner } = useSocialContentCommentsModal();
    const [isOpen, setIsOpen] = useState(false);
    const [contentId, setContentId] = useState<string>();
    const [contentType, setContentType] = useState<string>();
    const [commentsInput, setCommentsInput] = useState<any[]>([]);
    const [replyUser, setReplyUser] = useState<Profile | null>(null);
    // listen for pubsub event
    Listen((props) => {
        if (props && "id" in props && "type" in props) {
            setContentId(props.id);
            setContentType(props.type);
            setIsOpen(true);
        } else {
            setIsOpen(false);
            setContentId(undefined);
            setContentType(undefined);
        }
    });

    useEffect(() => removeListner, []);

    const { data: comments, isLoading } = useAdminGetContentCommentsQuery(
        contentId && contentType
            ? {
                contentId,
                contentType,
                pagination: { skip: 0, take: 4 },
            }
            : ({} as any),
        isOpen
    );
    const handleAddComment = (msg: string) => {
        console.log("New comment:", msg);
        // TODO: Call API to save comment
        setCommentsInput((prev) => [
            ...prev,
            {
                id: Date.now().toString(),
                content: msg,
                commentedAt: new Date().toISOString(),
                likes: 0,
                replies: 0,
                author: {
                    id: "current-user-id",
                    username: "You",
                    photo: "/me.jpg",
                    verified: false,
                },
            },
        ]);
    };
    const handleClose = () => {
        setIsOpen(false);
        setReplyUser(null);
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={handleClose}>
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <Dialog.Title className="text-lg font-bold">Comments</Dialog.Title>
                            <button onClick={() => handleClose()}>
                                <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                            </button>
                        </div>

                        {/* Content */}
                        {isLoading ? (
                            <p className="text-center text-gray-500">Loading...</p>
                        ) : (
                            <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-2">
                                {mapArray(comments, (v, i) => (
                                    <PostCommentCard key={i} comment={v as any}   setShowReplyUser={(user) => setReplyUser(user as Profile)} />
                                ))}
                            </div>
                        )}
                        <CommentInputBox placeholder="Write a comment..." onSend={handleAddComment}

                            replyUser={replyUser}
                        />
                    </Dialog.Panel>
                </div>
            </Dialog>
        </Transition>
    );
};