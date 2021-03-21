import React, { Component } from "react";
import "./Pagination.css";

export default class Pagination extends Component {
  getPages(currentPage, totalPage, visible) {
    var pages = [];

    var half = Math.floor(visible / 2);
    var start = currentPage - half + 1 - (visible % 2);
    var end = currentPage + half;

    var visiblePages = visible;
    if (visiblePages > totalPage) {
      visiblePages = totalPage;
    }

    // handle boundary case
    if (start <= 0) {
      start = 1;
      end = visiblePages;
    }
    if (end > totalPage) {
      start = totalPage - visiblePages + 1;
      end = totalPage;
    }

    var itPage = start;
    while (itPage <= end) {
      pages.push(itPage);
      itPage++;
    }

    return pages;
  }
  render() {
    const {
      canNext,
      canPrevious,
      page,
      onPageChange,
      pages,
      visible = 5,
    } = this.props;

    let pageList = this.getPages(page, pages, visible);

    return (
      <div className={"pagination"}>
        <button
          className={`${"buttons"} ${"initial"}`}
          onClick={() => onPageChange(0)}
          disabled={!canPrevious}
        >
          {"First"}
        </button>
        <button
          className={"buttons"}
          onClick={() => onPageChange(page - 1)}
          disabled={!canPrevious}
        >
          {"<"}
        </button>
        {pageList.map((p) => {
          return (
            <button
              key={p}
              className={`${"buttons"} ${page + 1 == p ? "current" : ""}`}
              onClick={() => onPageChange(p - 1)}
            >
              {p}
            </button>
          );
        })}
        <button
          className={"buttons"}
          onClick={() => onPageChange(page + 1)}
          disabled={!canNext}
        >
          >
        </button>
        <button
          className={`${"buttons"} ${"initial"}`}
          onClick={() => onPageChange(pages - 1)}
          disabled={!canNext}
        >
          Last
        </button>
      </div>
    );
  }
}
