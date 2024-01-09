import classes from './Controls.module.scss';

const Controls= ({currentPage,setCurrentPage,rangeEnd,rangeStart,totalPages,indexOfLastDriver,drivers})=>{


    return (
        <div className={classes.controls}>
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className={classes.pageButton}
        >
          First
        </button>
        <button
          className={classes.pageButton}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {'<<'}
        </button>

        {Array.from({ length: rangeEnd - rangeStart + 1 }, (_, index) => rangeStart + index).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`${classes.pageButton} ${page === currentPage ? classes.activePage : ''}`}
            disabled={page === currentPage}
          >
            {page}
          </button>
        ))}

        {rangeEnd < totalPages && (
          <>
            <span>...</span>
            <button onClick={() => setCurrentPage(totalPages)} className={classes.pageButton}>
              {totalPages}
            </button>
          </>
        )}

        <button
          className={classes.pageButton}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastDriver >= drivers.length}
        >
          {'>>'}
        </button>

        <button
          onClick={() => setCurrentPage(totalPages)}
          className={classes.pageButton}
        >
          Last
        </button>
      </div>
    )
}

export default Controls;