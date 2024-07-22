interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {

    const handlePrev = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const endList = currentPage === totalPages;

    return (
        <div className="pagination my-4">
            <button
                className={`arrow-btn ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={handlePrev}
            >
                <img src="/images/arrow.svg" className="left-arrow" alt="Previous" />
            </button>
            {currentPage}
            <button
                className={`arrow-btn ${endList ? 'disabled' : ''}`}
                disabled={endList}
                onClick={handleNext}
            >
                <img src="/images/arrow.svg" className="right-arrow" alt="Next" />
            </button>
        </div>
    );
};

export default Pagination;
