import { Comment } from "../types";
import DeleteButton from "./common/DeleteButton";
import useDeleteComment from "../hooks/useDeleteComment";

export default function CommentItem({ comment }: { comment: Comment }) {
  const deleteComment = useDeleteComment();
  const handleDeleteComment = (commentId: string) => {
    deleteComment({ ticketId: comment.ticket_id, commentId });
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
