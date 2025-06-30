import "./Pagination.css";

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    maxVisiblePages = 5,
    prevText = "이전",
    nextText = "다음",
    classNamePrefix = "pagination",
}) => {
    if (totalPages <= 1) return null;

    // 페이지 범위 계산
    const half = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, currentPage - half);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pageNumbers = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
    );

    return (
        <div className={`${classNamePrefix}`}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`${classNamePrefix}-btn`}
            >
                {prevText}
            </button>

            {startPage > 1 && (
                <>
                    <button
                        onClick={() => onPageChange(1)}
                        className={`${classNamePrefix}-btn`}
                    >
                        1
                    </button>
                    {startPage > 2 && <span className={`${classNamePrefix}-ellipsis`}>...</span>}
                </>
            )}

            {pageNumbers.map((num) => (
                <button
                    key={num}
                    onClick={() => onPageChange(num)}
                    className={`${classNamePrefix}-btn ${
                        currentPage === num ? `${classNamePrefix}-active` : ""
                    }`}
                >
                    {num}
                </button>
            ))}

            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span className={`${classNamePrefix}-ellipsis`}>...</span>}
                    <button
                        onClick={() => onPageChange(totalPages)}
                        className={`${classNamePrefix}-btn`}
                    >
                        {totalPages}
                    </button>
                </>
            )}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`${classNamePrefix}-btn`}
            >
                {nextText}
            </button>
        </div>
    );
};

export default Pagination;