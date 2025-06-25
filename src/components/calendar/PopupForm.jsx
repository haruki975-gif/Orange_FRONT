import { forwardRef, useState } from "react";

const PopupForm = forwardRef(({ selectedDate, x, y, strategy, onClose, onAddEvent, ...props }, ref) => {
  const [taskText, setTaskText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      // 여기서 일정 저장 로직 추가
      onAddEvent({ task: taskText });
      setTaskText("");
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
    if (e.key === 'Enter') {
      e.preventDefault(); // 기본 Enter 동작 방지
      handleSubmit(e); // 또는 폼 제출 함수 호출
    }
  };

  return (
    <div
      ref={ref}
      style={{
        position: strategy,
        top: y ?? 0,
        left: x ?? 0,
        backgroundColor: "white",
        border: "solid #2684FF",
        borderRadius: "3px",
        padding: "8px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        zIndex: 1000,
        minWidth: "280px",
        maxWidth: "320px"
      }}
      {...props}
    >


      <form onSubmit={handleSubmit}>
        <textarea
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="무엇을 완료해야 하나요?"
          autoFocus
          style={{
            width: "100%",
            padding: "10px 12px",
            border: "1px solid #ddd",
            borderStyle: "none",
            fontSize: "14px",
            outline: "none",
            boxSizing: "border-box",
            resize: "none",
            fontFamily: "inherit"
          }}
        />

        <div style={{
          display: "flex",
          gap: "8px",
          justifyContent: "flex-end"
        }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "2px 16px",
              border: "1px solid #ddd",
              borderRadius: "3px",
              backgroundColor: "white",
              color: "#666",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "bold",
              height: "24px"
            }}
          >
            취소
          </button>
          <button
            type="submit"
            disabled={!taskText.trim()}
            style={{
              padding: "2px 16px",
              border: "none",
              borderRadius: "3px",
              backgroundColor: taskText.trim() ? "#007bff" : "#ccc",
              color: "white",
              cursor: taskText.trim() ? "pointer" : "not-allowed",
              fontSize: "14px",
              fontWeight: "bold",
              height: "24px"
            }}
          >
            만들기
          </button>
        </div>
      </form>
    </div>
  );
});

PopupForm.displayName = "PopupForm";

export default PopupForm;