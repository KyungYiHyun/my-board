import CommentItem from "./CommentItem";

export default function CommentTree({ comments, depth = 0, currentMemberId, onDelete, onUpdate, onReply }) {
    return (
        <>
            {comments.map((comment) => (
                <div key={comment.commentId}>
                    <CommentItem
                        comment={comment}
                        depth={depth}
                        currentMemberId={currentMemberId}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                        onReply={onReply}
                    />
                    {comment.children && comment.children.length > 0 && (
                        <CommentTree
                            comments={comment.children}
                            depth={depth + 1}
                            currentMemberId={currentMemberId}
                            onDelete={onDelete}
                            onUpdate={onUpdate}
                            onReply={onReply}
                        />
                    )}
                </div>
            ))}
        </>
    );
}
