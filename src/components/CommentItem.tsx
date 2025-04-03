import { Comment } from "../types";
import DeleteButton from "./common/DeleteButton";
// import useDeleteComment from "../hooks/useDeleteComment";
import { deleteComment } from "../api";

export default function CommentItem({ comment }: { comment: Comment }) {
  const handleDeleteComment = (commentId: string) => {
    deleteComment({ ticketId: comment.ticketId, commentId });
  };

  return (
    <li key={comment.id}>
      <p>{comment.content}</p>
      <DeleteButton
        label="Delete Comment"
        onClick={() => handleDeleteComment(comment.id)}
      />
    </li>
  );
}
