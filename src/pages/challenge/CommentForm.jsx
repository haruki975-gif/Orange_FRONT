import { useState, useEffect } from "react";
import "./CommentForm.css";

const CommentForm = ({
  onSubmit,               
  buttonLabel = "댓글 작성",
  allowImage = true,
  initialContent = "",    
  initialImage = null,    
}) => {
  const [content, setContent] = useState(initialContent);
  const [image, setImage] = useState(initialImage);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setPreviewUrl(url);

      return () => {
        URL.revokeObjectURL(url);
        setPreviewUrl(null);
      };
    } else {
      setPreviewUrl(null);
    }
  }, [image]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setImage(selected);
    }
  };

    const handleRemoveImage = () => {
      setImage(null);
    
      // input[type="file"] 엘리먼트의 값을 초기화 (빈 문자열 할당)
      const fileInput = document.getElementById("fileInput");
      if (fileInput) {
        fileInput.value = "";
      }
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
                placeholder="댓글을 입력해주세요"
                required
                disabled={loading}
            />

            {allowImage && image && (
                <div className="image-preview-wrapper">
                    <img src={previewUrl} alt="preview" className="image-preview" />
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={handleRemoveImage}
                      aria-label="첨부 이미지 삭제"
                    >
                        X
                    </button>
                </div>
            )}

            <div className="button-row">
                {allowImage && (
                    <>
                        <button
                            type="button"
                            className="file-button"
                            onClick={() => document.getElementById("fileInput").click()}
                            disabled={loading}
                        >
                            첨부
                        </button>
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                            disabled={loading}
                        />
                    </>
                )}
                
                <button
                    type="submit" disabled={loading}
                    className="submit-button"
                >
                    {loading ? "등록 중..." : buttonLabel}
                </button>
            </div>
        </form>
    );
};

export default CommentForm;