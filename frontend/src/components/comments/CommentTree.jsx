import CommentItem from "./CommentItem";

export default function CommentTree({ comments, depth = 0, loggedInMemberId, onDelete, onUpdate, onReply }) {
    return (
        <>
            {comments.map((comment) => (
                <div key={comment.commentId}>
                    <CommentItem
                        comment={comment}
                        depth={depth}
                        loggedInMemberId={loggedInMemberId}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                        onReply={onReply}
                    />
                    {comment.children && comment.children.length > 0 && (
                        <CommentTree
                            comments={comment.children}
                            depth={depth + 1}
                            loggedInMemberId={loggedInMemberId}
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
