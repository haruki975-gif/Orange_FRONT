import { useState } from "react";
import { toast } from "react-toastify";
import "./CommentForm.css";

const CommentForm = ({
  onSubmit,               // ({ content, image }) => Promise
  buttonLabel = "댓글 작성",
  allowImage = true,
  initialContent = "",    // 수정 시 사용
  initialImage = null,    // 수정 시 사용
}) => {
  const [content, setContent] = useState(initialContent);
  const [image, setImage] = useState(initialImage);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setImage(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    onSubmit({ content, image })
      .then(() => {
        setContent("");
        setImage(null);
      })
      .catch(() => {
        alert("등록 실패");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 입력하세요..."
        required
        disabled={loading}
      />

      {allowImage && (
        <>
          <label htmlFor="fileInput" className="file-label">
            이미지 선택
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
            disabled={loading}
          />
          {image && <div className="selected-image-name">{image.name}</div>}
        </>
      )}

      <button type="submit" disabled={loading}>
        {loading ? "등록 중..." : buttonLabel}
      </button>
    </form>
  );
};

export default CommentForm;